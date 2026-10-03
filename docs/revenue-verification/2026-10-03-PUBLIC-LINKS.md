# Restore verified project destinations

Source base: `0da5a636b2d53939414efba83bca3a450c8dee97` on `tylerdr/taidurden`.
Review date: October 3, 2026.

## Customer result

Six product detail pages gain a Visit project website link through the existing dated profile-evidence overlay. Each destination is supported by the corresponding product repository and a current browser visit:

| Product | Destination | Repository evidence |
| --- | --- | --- |
| UIProof | https://uiproof.com | `tylerdr/uiproof` at `fdf9e2789cc83e019bb086bbbdb655beaf1030b5`, `AGENTS.md` |
| Build Own Sell | https://buildownsell.vercel.app | `SprinterHQ/buildownsell` at `9b0b45f7d096995b8dd3ff926c27e5032a6d208f`, `README.md` |
| BrandKit Express | https://www.brandkitexpress.com/ | `tylerdr/brandkit-express` at `c6fb8745383983412023954793ad14f1fa3c9260`, `src/lib/site.ts` |
| EveryMCP | https://everymcp.com/ | `tylerdr/everymcp-site` at `2690e148e8d5136649d210f66201cfba31cad890`, `documents/HANDOFF.md` |
| CatalogProof | https://catalogproof.vercel.app/ | `tylerdr/catalogproof` at `41f5a60fef08a47267a25b379a28a7adc05a74d0`, `README.md` |
| AI Readiness Audit | https://ai-readiness-audit-ten.vercel.app/ | `tylerdr/ai-readiness-audit` at `d11742cd68b411467c8bb4cfcc44cbaf508326ef`, `CLAUDE.md` application URL |

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

Review this diff against the source base, preserve the normal hosted build and verification commands, then verify the six detail pages expose the exact expected HTTPS destinations on the deployed revision. Confirm each destination in a normal browser. Revert the six added evidence entries to roll back the navigation change.
