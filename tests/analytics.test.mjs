import test from 'node:test';
import assert from 'node:assert/strict';
import { trackEvent, trackGaEvent } from '../lib/analytics.ts';

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

test('Google Analytics conversion events keep only allowlisted non-PII parameters', () => {
  const originalWindow = globalThis.window;
  const calls = [];
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { gtag: (...args) => calls.push(args) },
  });
  try {
    trackGaEvent('generate_lead', {
      method: 'newsletter',
      placement: 'homepage',
      email: 'qa@example.invalid',
      name: 'QA test',
    });
    assert.deepEqual(calls, [['event', 'generate_lead', { method: 'newsletter', placement: 'homepage' }]]);
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', { configurable: true, value: originalWindow });
    else delete globalThis.window;
  }
});
