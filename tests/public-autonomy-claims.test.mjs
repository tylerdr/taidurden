import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const services = readFileSync(new URL("../app/services/page.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/site-footer.tsx", import.meta.url), "utf8");
const publicCopy = `${services}\n${footer}`;

const retiredClaims = [
  "Tai is fully autonomous",
  "fulfilled entirely by AI",
  "work is researched, built, and deployed entirely by machines",
  "$0 human labor cost",
  "execution is fully automated",
  "No human hours = no human overhead",
  "Built entirely by AI agents. No human code. No agency overhead.",
];

test("public service surfaces do not claim zero-human autonomous execution", () => {
  for (const claim of retiredClaims) {
    assert.equal(publicCopy.includes(claim), false, `retired autonomy claim returned: ${claim}`);
  }
});

test("public service surfaces preserve the real authority and evidence boundary", () => {
  assert.match(services, /Consequential actions remain authorized/);
  assert.match(services, /does not, by itself,[\s\S]*prove zero-human execution/);
  assert.match(services, /brief is reviewed before a payment link is sent/i);
  assert.match(footer, /human-authorized where consequential actions require it/);
});
