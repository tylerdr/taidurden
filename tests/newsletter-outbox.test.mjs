import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NEWSLETTER_CLAIM_RPC,
  NEWSLETTER_FAILED_RPC,
  NEWSLETTER_SENT_RPC,
  newsletterRetryAt,
  processNewsletterDeliveryBatch,
  readNewsletterProviderConfig,
  sendNewsletterConfirmation
} from '../lib/newsletter-outbox.ts';

const config = { provider: 'resend', apiKey: 'test-only', fromEmail: 'sender@example.com' };
const job = {
  id: 'job-1',
  tenant_id: 'tenant-1',
  subscriber_id: 'subscriber-1',
  idempotency_key: 'welcome:v1:abc',
  status: 'processing',
  attempt_count: 1,
  max_attempts: 5,
  recipient_email: 'qa@example.invalid',
  recipient_name: 'QA Test',
  claim_token: 'claim-1'
};

test('provider config requires explicit key and sender without claiming sender verification', () => {
  assert.deepEqual(readNewsletterProviderConfig({}), { configured: false, reason: 'provider_key_missing' });
  assert.deepEqual(readNewsletterProviderConfig({ RESEND_API_KEY: 'key' }), { configured: false, reason: 'sender_missing' });
  assert.deepEqual(readNewsletterProviderConfig({ RESEND_API_KEY: 'key', TAIDURDEN_NEWSLETTER_FROM_EMAIL: 'bad' }), { configured: false, reason: 'sender_invalid' });
  assert.deepEqual(readNewsletterProviderConfig({ RESEND_API_KEY: 'key', TAIDURDEN_NEWSLETTER_FROM_EMAIL: 'Sender@Example.com' }), {
    configured: true,
    config: { provider: 'resend', apiKey: 'key', fromEmail: 'sender@example.com' }
  });
});

test('confirmation sender uses provider idempotency key and journal resource', async () => {
  let request;
  const result = await sendNewsletterConfirmation(job, config, async (...args) => {
    request = args;
    return new Response(JSON.stringify({ id: 're_123' }), { status: 200, headers: { 'content-type': 'application/json' } });
  });
  assert.deepEqual(result, { provider: 'resend', providerMessageId: 're_123' });
  assert.equal(request[0], 'https://api.resend.com/emails');
  assert.equal(request[1].headers.Authorization, 'Bearer test-only');
  assert.equal(request[1].headers['Idempotency-Key'], job.idempotency_key);
  const body = JSON.parse(request[1].body);
  assert.equal(body.to[0], job.recipient_email);
  assert.match(body.text, /https:\/\/taidurden\.com\/journal\//);
});

test('worker marks a claimed job sent after the provider returns a receipt', async () => {
  const calls = [];
  const supabase = { rpc: async (name, args) => {
    calls.push({ name, args });
    if (name === NEWSLETTER_CLAIM_RPC) return { data: [job], error: null };
    if (name === NEWSLETTER_SENT_RPC) return { data: true, error: null };
    assert.fail(`unexpected rpc ${name}`);
  } };
  const summary = await processNewsletterDeliveryBatch(supabase, 'tenant-1', config, {
    fetchImpl: async () => new Response(JSON.stringify({ id: 're_123' }), { status: 200 }),
    now: () => new Date('2026-09-21T12:00:00.000Z')
  });
  assert.deepEqual(summary, { status: 'processed', claimed: 1, sent: 1, failed: 0, terminal: 0 });
  assert.equal(calls[0].name, NEWSLETTER_CLAIM_RPC);
  assert.equal(calls[1].name, NEWSLETTER_SENT_RPC);
  assert.equal(calls[1].args.p_claim_token, 'claim-1');
});

test('worker records bounded retry state for provider failures', async () => {
  const calls = [];
  const supabase = { rpc: async (name, args) => {
    calls.push({ name, args });
    if (name === NEWSLETTER_CLAIM_RPC) return { data: [job], error: null };
    if (name === NEWSLETTER_FAILED_RPC) return { data: true, error: null };
    assert.fail(`unexpected rpc ${name}`);
  } };
  const summary = await processNewsletterDeliveryBatch(supabase, 'tenant-1', config, {
    fetchImpl: async () => new Response('provider unavailable', { status: 503 }),
    now: () => new Date('2026-09-21T12:00:00.000Z')
  });
  assert.deepEqual(summary, { status: 'processed', claimed: 1, sent: 0, failed: 1, terminal: 0 });
  assert.equal(calls[1].name, NEWSLETTER_FAILED_RPC);
  assert.equal(calls[1].args.p_error, 'resend_http_503');
  assert.equal(calls[1].args.p_terminal, false);
  assert.equal(calls[1].args.p_next_attempt_at, newsletterRetryAt(1, new Date('2026-09-21T12:00:00.000Z')));
});

test('worker marks the final bounded attempt terminal', async () => {
  const calls = [];
  const terminalJob = { ...job, attempt_count: 5, max_attempts: 5 };
  const supabase = { rpc: async (name, args) => {
    calls.push({ name, args });
    if (name === NEWSLETTER_CLAIM_RPC) return { data: [terminalJob], error: null };
    if (name === NEWSLETTER_FAILED_RPC) return { data: true, error: null };
    assert.fail(`unexpected rpc ${name}`);
  } };
  const summary = await processNewsletterDeliveryBatch(supabase, 'tenant-1', config, {
    fetchImpl: async () => new Response('provider unavailable', { status: 503 })
  });
  assert.deepEqual(summary, { status: 'processed', claimed: 1, sent: 0, failed: 1, terminal: 1 });
  assert.equal(calls[1].args.p_terminal, true);
});

test('worker preserves a storage blocker without calling the provider', async () => {
  let fetchCalled = false;
  const supabase = { rpc: async (name) => {
    assert.equal(name, NEWSLETTER_CLAIM_RPC);
    return { data: null, error: { message: 'migration missing' } };
  } };
  const summary = await processNewsletterDeliveryBatch(supabase, 'tenant-1', config, {
    fetchImpl: async () => { fetchCalled = true; return new Response('{}', { status: 200 }); }
  });
  assert.deepEqual(summary, { status: 'storage_unavailable', claimed: 0, sent: 0, failed: 0, terminal: 0 });
  assert.equal(fetchCalled, false);
});
