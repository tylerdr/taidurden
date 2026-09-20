# Newsletter repair — verification receipt

Base: `5e611f7ca2a5e87063b3f2cb88ca71a222f72ec8` (current main when checked September 20, 2026). Production release has not been changed.

## Reproduction

- Live homepage valid labeled synthetic signup returned 500. The response exposed a PostgREST error: the existing subscribers table has no metadata column.
- Live null JSON and numeric email also returned 500; malformed email returned 400.
- Both homepage and newsletter page share NewsletterSignupForm and /api/subscribe.
- Current subscriber schema was inspected read-only. Supported fields include tenant_id, email, name and source. No schema change is needed.
- Browser also showed an unauthenticated analytics sendBeacon CORS failure; its fallback authenticated fetch already exists.

## Repair

Use only existing subscriber columns, validate unknown payload types before trim, bound email/name input, return controlled errors for unavailable configuration/storage, and keep database details private. Duplicate subscriptions remain 409 without reactivation or update. Announce form feedback accessibly and describe only the saved signup. Send one authenticated keepalive analytics request instead of an extra failing beacon.

## Validation

- 52 source tests passed in the full build; all 53 tests passed after adding the analytics regression. Independent review found no product-code issue and one duplicate-test fidelity gap, corrected before final checks.
- Typecheck passed; Next production build and existing HTTP/image/sitemap verifier passed: 46 routes, 32 products, 32 decoded unique images, 12 retained brand images, 6 overlapping theses, 12 excluded routes.
- Built local newsletter form submitted a unique QA-only .invalid email using the real production Supabase configuration. Success was visible and an exact scoped database read found one matching row. Duplicate browser submission returned 409. The synthetic row was removed by exact id/email/name/source filter and zero matching rows verified. No real subscribers were read or modified.
- Existing console favicon 404 is unrelated. Removed beacon's CORS error did not recur in local browser. Standard excluded-route checks log existing Next NoFallbackError diagnostics while returning expected 404; verification still passed.

These checks prove the local source repair against the actual storage contract. They do not prove a deployed fix, newsletter delivery or a campaign run. The handler contains no confirmation-email provider call; production environment names include Supabase configuration and analytics only. No email was sent, provider setting changed or purchase made.

## Release

Review and merge this isolated fix; let the connected Vercel project deploy the reviewed SHA. Then repeat one labeled signup at taidurden.com and read back its scoped subscriber row. Confirm the authorized delivery inbox and newsletter dispatch owner separately before claiming end-to-end email delivery. Preserve the 32-product catalog and unrelated PR #7.
