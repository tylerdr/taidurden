# Visual project directory — September 17, 2026

## Scope
Canonical Tai Durden identity; 44 individual editorial PNG share images; image-bearing cards and detail pages; concise descriptions, audience and three product-focus areas for all registered entries. Keep 12 original brand assets. No new runtime dependencies, model calls, third-party image fetches, customer records, provider settings or prices. The source-only public registry remains a dated projection; Amble is the business system of record.

## Image pipeline
`app/project-images/[slug]/route.ts` prerenders the allowlisted registry through `next/og`, using local typography and original topic-specific SVG geometry in `lib/project-image.tsx`. Every entry has its own 1200×630 PNG with project name, value proposition, category and canonical URL. Existing historical artwork remains on the original cards; new projects show the rendered images. Every detail page declares its own Open Graph and Twitter image. These are editorial brand images, not customer proof or product screenshots.

## Content evidence
The baseline is the owner-provided product context and September 17 public registry, not an assertion of current paid fulfillment. Dated source enrichment in `data/project-profile-evidence.json` overrides earlier unverified seed copy through one profile selector.
- SpotBundle: current repository README describes a SaaS launch-distribution service and https://spotbundle.com.
- Little Lines: current repository README describes a parent-owned drawing archive with observation-based prompts, not clinical screening or grades.
- PotentialPools: current `app/layout.tsx` and https://potentialpools.com describe homeowner alerts and outreach for pool-service businesses. The generic fork README is not used as product truth.
- Amble: latest owner correction names https://app.sprinter.ai as the system of record/control plane.
- CreditLatch and DeleteRail: initial connector fetches failed, then live HTTP 200 product pages were retrieved from the verification host at 2026-09-18T01:57:36Z. CreditLatch describes local CSV exception checks for bookkeeping/controller firms; DeleteRail describes customer-owned, review-gated privacy-request implementation. These descriptions do not establish paid-service acceptance, recovered cash or legal compliance.
No public pricing, activation, autonomous-worker or financial-outcome claims were inferred from repository existence.

## Required acceptance
Run all source/data tests, full Next build/TypeScript, then the built-server verification script. It checks every page and sitemap for canonical identity, all project metadata, all 44 unique PNGs through a full pixel decode, 12 retained artwork files and unknown-route 404 behavior. For actual production, set `PORTFOLIO_VERIFY_BASE_URL` and `EXPECTED_SITE_SHA`; the latter must match each detail page's built revision marker. Browser checks are recorded separately and must not be inferred from HTTP tests.

## Rollback
Revert the visual-directory commits without reverting the already deployed naming correction. Do not merge older competing registry branches or the verification-only browser build override. No database or provider rollback is required.
