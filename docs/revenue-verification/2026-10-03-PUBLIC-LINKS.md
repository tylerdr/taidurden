# Restore verified project destinations

Source base: `0da5a636b2d53939414efba83bca3a450c8dee97` on `tylerdr/taidurden`.
Review date: October 3, 2026.

## Customer result

Nine product detail pages gain a Visit project website link through the existing dated profile-evidence overlay. All 32 listed products then have public destinations. Each added destination is supported by the corresponding product repository and a current public-product check:

| Product | Destination | Repository evidence |
| --- | --- | --- |
| UIProof | https://uiproof.com | `tylerdr/uiproof` at `fdf9e2789cc83e019bb086bbbdb655beaf1030b5`, `AGENTS.md` |
| Build Own Sell | https://buildownsell.vercel.app | `SprinterHQ/buildownsell` at `9b0b45f7d096995b8dd3ff926c27e5032a6d208f`, `README.md` |
| BrandKit Express | https://www.brandkitexpress.com/ | `tylerdr/brandkit-express` at `c6fb8745383983412023954793ad14f1fa3c9260`, `src/lib/site.ts` |
| EveryMCP | https://everymcp.com/ | `tylerdr/everymcp-site` at `2690e148e8d5136649d210f66201cfba31cad890`, `documents/HANDOFF.md` |
| CatalogProof | https://catalogproof.vercel.app/ | `tylerdr/catalogproof` at `41f5a60fef08a47267a25b379a28a7adc05a74d0`, `README.md` |
| AI Readiness Audit | https://ai-readiness-audit-ten.vercel.app/ | `tylerdr/ai-readiness-audit` at `d11742cd68b411467c8bb4cfcc44cbaf508326ef`, `CLAUDE.md` application URL |
| PlayDays | https://ourplaydays.com/ | `tylerdr/playdays` at `e4c7d693df92d67fe6cf637e2834ab79121fc7cf`, `documents/HANDOFF.md` |
| SproutParent | https://sproutparent.com/ | `tylerdr/sproutparent` at `4a4627591949a1260920729d7bb46c674f3b2b5c`, `lib/seo.ts` |
| Little Lines | https://little-lines-ai.vercel.app/ | `tylerdr/little-lines` at `0620f5738b2cd6904f58fec5e0d21aa3ce17f462`, billing `.env.example` and the exact-main Vercel production alias |

UIProof, Build Own Sell, BrandKit Express, EveryMCP, CatalogProof, AI Readiness Audit and SproutParent were visited in a normal browser. PlayDays and Little Lines were checked through ordinary public HTTP reads after the browser backend became unavailable: each returned 200 HTML with the actual product title, product content and matching canonical origin. Those reads establish destination identity, not interactive browser acceptance.

A working public destination establishes navigation only; it provides no payment, delivery, customer or revenue receipt. Existing product positioning and proposed value contracts are outside this navigation change.

CIMReader, CreditLatch, DeleteRail, SpotBundle and PotentialPools already have destinations in `data/project-profile-evidence.json`. The detail route already prefers `profile.publicUrl` to the manifest fallback. Those entries do not need duplicate URL declarations.

## Verification method

- All 124 text files in the local source snapshot were fetched at the exact source base and matched their Git blob hashes.
- All 12 preserved PNG brand illustrations match the original source Git blob hashes byte for byte.
- Dependencies were installed with the existing lockfile using `npm ci --no-audit --no-fund`.
- The normal `npm run build` pipeline runs the metrics refresh, existing 64 source/data tests, Next build and the built-server HTTP/image/sitemap/exclusion acceptance script. The command and all verification code are unchanged.
- Exact revision, build outcome, hosted deployment and browser acceptance receipts belong in the pull request so they can be updated without changing the verified source revision.

## Scope

The patch uses the existing editorial URL overlay. The 32 product identities, proposed value contracts, membership version, prices and accepted Amble state are preserved. No destination is inferred for an unverified origin.

## Release and rollback

Review this diff against the source base, preserve the normal hosted build and verification commands, then verify the nine detail pages expose the exact expected HTTPS destinations on the deployed revision. Record normal-browser acceptance where available and distinguish ordinary HTTP verification when the browser service is unavailable. To roll back, remove the eight new entries and restore the previous Little Lines evidence entry without its added URLs.
