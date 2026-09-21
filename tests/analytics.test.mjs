import test from 'node:test';
import assert from 'node:assert/strict';
import { trackEvent } from '../lib/analytics.ts';

test('analytics sends one authenticated keepalive request without an unauthenticated beacon', async () => {
  const originalFetch = globalThis.fetch;
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const requests = [];
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { sendBeacon() { assert.fail('Supabase beacon cannot include required auth headers'); } } });
  globalThis.fetch = async (url, options) => { requests.push({ url, options }); return new Response(null, { status: 201 }); };
  try {
    await trackEvent('test-tenant', { event_type: 'page_view', page_url: 'https://taidurden.com/newsletter/' });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].options.keepalive, true);
    assert.ok(requests[0].options.headers.apikey);
    assert.match(requests[0].options.headers.Authorization, /^Bearer /);
    assert.equal(JSON.parse(requests[0].options.body).tenant_id, 'test-tenant');
  } finally {
    globalThis.fetch = originalFetch;
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
    else delete globalThis.navigator;
  }
});
