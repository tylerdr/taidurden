import test from 'node:test';
import assert from 'node:assert/strict';
import { handleSubscription } from '../lib/newsletter.ts';

function database(options = {}) {
  const rows = [];
  const outboxRows = [];
  const create = () => {
    if (options.fail) throw new Error('Missing secret configuration');
    return { from(table) {
      if (table === 'tenants') return { select(field) {
        assert.equal(field, 'id');
        return { eq(key, value) {
          assert.equal(key, 'slug'); assert.equal(value, 'taidurden');
          return { maybeSingle: async () => ({ data: options.missingTenant ? null : { id: 'tai-tenant' }, error: options.tenantError ? { message: 'private database detail' } : null }) };
        } };
      } };
      if (table === 'subscribers') return { insert: (row) => {
        // Regression: the deployed table rejects unsupported columns, notably metadata.
        const columns = new Set(['tenant_id', 'email', 'name', 'source']);
        for (const column of Object.keys(row)) assert.ok(columns.has(column), column);
        return { select(field) {
          assert.equal(field, 'id');
          return { single: async () => {
            if (options.insertError) return { data: null, error: options.insertError };
            rows.push(row);
            return { data: { id: 'subscriber-id' }, error: null };
          } };
        } };
      } };
      if (table === 'taidurden_newsletter_delivery_outbox') return { upsert: async (row) => {
        if (options.outboxError !== false) return { error: options.outboxError ?? { code: 'PGRST205', message: 'outbox not migrated' } };
        outboxRows.push(row);
        return { error: null };
      } };
      assert.fail(`unexpected table ${table}`);
    } };
  };
  return { create, rows, outboxRows };
}
const request = (value) => new Request('https://taidurden.com/api/subscribe', { method: 'POST', body: JSON.stringify(value) });

test('valid signup uses the actual tenant-scoped subscriber columns and normalizes input', async () => {
  const db = database();
  const response = await handleSubscription(request({ email: '  QA@Example.invalid ', name: '  QA TEST ' }), db.create);
  assert.equal(response.status, 200); assert.deepEqual(await response.json(), { success: true, confirmation: { status: 'confirmed', nextPath: '/journal' }, emailDelivery: { status: 'unavailable' } });
  assert.deepEqual(db.rows, [{ tenant_id: 'tai-tenant', email: 'qa@example.invalid', name: 'QA TEST', source: 'taidurden.com' }]);
});
test('successful signup records one pending email job when the outbox is available', async () => {
  const db = database({ outboxError: false });
  const response = await handleSubscription(request({ email: 'qa@example.invalid' }), db.create);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, confirmation: { status: 'confirmed', nextPath: '/journal' }, emailDelivery: { status: 'pending' } });
  assert.equal(db.outboxRows.length, 1);
  assert.equal(db.outboxRows[0].tenant_id, 'tai-tenant');
  assert.equal(db.outboxRows[0].subscriber_id, 'subscriber-id');
  assert.match(db.outboxRows[0].idempotency_key, /^welcome:v1:[a-f0-9]{64}$/);
});
test('malformed JSON and wrong input types return 400 without touching storage', async () => {
  const noDatabase = () => { assert.fail('must not access storage'); };
  for (const value of [null, [], 42, { email: 123 }, { email: 'bad' }, { email: 'qa@example.invalid', name: {} }, { email: 'qa@example.invalid', name: 'x'.repeat(121) }]) {
    assert.equal((await handleSubscription(request(value), noDatabase)).status, 400);
  }
  assert.equal((await handleSubscription(new Request('https://taidurden.com/api/subscribe', { method: 'POST', body: '{' }), noDatabase)).status, 400);
});
test('duplicate does not claim a new signup or reactivate an unsubscribed record', async () => {
  const db = database({ insertError: { code: '23505', message: 'private unique constraint' } });
  const response = await handleSubscription(request({ email: 'qa@example.invalid' }), db.create);
  assert.equal(response.status, 409); const body = await response.json();
  assert.equal(body.success, false); assert.ok(!JSON.stringify(body).includes('constraint'));
  assert.equal(body.confirmation, undefined);
  assert.deepEqual(db.rows, []);
});
test('configuration, tenant and storage failures return a safe actionable response', async () => {
  for (const options of [{ fail: true }, { tenantError: true }, { missingTenant: true }, { insertError: { message: 'private schema details' } }]) {
    const response = await handleSubscription(request({ email: 'qa@example.invalid' }), database(options).create);
    assert.equal(response.status, 503); const body = await response.json();
    assert.equal(body.success, false); assert.match(body.error, /try again later/); assert.ok(!JSON.stringify(body).includes('private'));
  }
});
