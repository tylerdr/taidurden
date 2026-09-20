# Revenue form verification — September 20, 2026

Reproduce the live newsletter signup and trace the subscriber record; verify both page placements share the handler. Preserve the current 32-product catalog and existing signup storage.

Fix demonstrated input-shape/exception and duplicate-state handling in the subscription boundary, test malformed JSON/type input and repeat subscriptions, and make response accessibility explicit. Address the observed unauthenticated analytics sendBeacon CORS failure without introducing tracking scope or credentials exposure. Verify local tests/build and browser behavior. Prepare reviewable source only; production release remains a separate step.

No changes to prices, newsletter campaign sends, provider secrets, database schema or payment activation.
