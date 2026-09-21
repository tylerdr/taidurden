import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const migration = readFileSync(new URL('../supabase/migrations/20260921123000_taidurden_newsletter_delivery_outbox.sql', import.meta.url), 'utf8');

test('newsletter outbox migration is tenant-scoped and bounded', () => {
  assert.match(migration, /create table if not exists public\.taidurden_newsletter_delivery_outbox/);
  assert.match(migration, /tenant_id uuid not null references public\.tenants\(id\)/);
  assert.match(migration, /subscriber_id uuid not null references public\.subscribers\(id\)/);
  assert.match(migration, /unique \(tenant_id, idempotency_key\)/);
  assert.match(migration, /status text not null default 'pending'/);
  assert.match(migration, /status in \('pending', 'processing', 'sent', 'failed'\)/);
  assert.match(migration, /max_attempts integer not null default 5/);
  assert.match(migration, /for update skip locked/);
  assert.match(migration, /where id = p_id\s+and status = 'processing'\s+and claim_token = p_claim_token/);
  assert.match(migration, /grant execute on function public\.claim_taidurden_newsletter_delivery_jobs/);
  assert.doesNotMatch(migration, /email_signups|follow_up_tasks|peakedlabs_email_deliveries/);
});
