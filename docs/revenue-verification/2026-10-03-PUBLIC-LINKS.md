# Restore verified project destinations

Source base: `0da5a636b2d53939414efba83bca3a450c8dee97` on `tylerdr/taidurden`.
Review date: October 3, 2026.

## Customer result

The UIProof and Build Own Sell detail pages gain a Visit project website link through the existing dated profile-evidence overlay. Each destination is supported by the corresponding project repository and the current public homepage:

| Product | Destination | Repository evidence |
| --- | --- | --- |
| UIProof | https://uiproof.com | `tylerdr/uiproof` at `fdf9e2789cc83e019bb086bbbdb655beaf1030b5`, `AGENTS.md` identifies uiproof.com |
| Build Own Sell | https://buildownsell.vercel.app | `SprinterHQ/buildownsell` at `9b0b45f7d096995b8dd3ff926c27e5032a6d208f`, current README and public homepage |

The current homepage reads identify UIProof as a visual review workspace and Build Own Sell as ownership research and tools. A working public destination establishes navigation only; it provides no payment, delivery, customer or revenue receipt.

CIMReader, CreditLatch, DeleteRail, SpotBundle and PotentialPools already have destinations in `data/project-profile-evidence.json`. The detail route already prefers `profile.publicUrl` to the manifest fallback. Those entries do not need duplicate URL declarations.

## Validation

- All 124 text files in the local source snapshot were fetched at the exact source base and matched their Git blob hashes.
- Existing source/data test command: `node --test tests/*.test.mjs tests/*.test.ts`.
- Result after the link change: 64 passed, zero failed.
- This source-only snapshot has no Next/React installation or binary artwork. Full Next build, built-server image/sitemap checks and preview/production browser acceptance remain release gates for the actual deployment environment.

## Scope

The patch uses the existing editorial URL overlay. The 32 product identities, proposed value contracts, membership version, prices and accepted Amble state are preserved.

## Release and rollback

Review this diff against the source base, preserve the normal hosted build and verification commands, then verify that `/ventures/uiproof/` and `/ventures/buildownsell/` expose the exact expected HTTPS destinations on the deployed revision. Confirm each destination in a normal browser. Revert these two added evidence entries to roll back the navigation change.
