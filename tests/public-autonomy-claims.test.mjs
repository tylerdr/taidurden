import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const services = read("app/services/page.tsx");
const servicesOg = read("app/services/opengraph-image.tsx");
const servicesTwitter = read("app/services/twitter-image.tsx");
const newsletter = read("app/newsletter/page.tsx");
const footer = read("components/site-footer.tsx");
const defaultOg = read("public/og-default.svg");
const publicCopy = [services, servicesOg, servicesTwitter, newsletter, footer, defaultOg].join("\n");

const retiredClaims = [
  "Tai is fully autonomous",
  "fulfilled entirely by AI",
  "work is researched, built, and deployed entirely by machines",
  "$0 human labor cost",
  "execution is fully automated",
  "No human hours = no human overhead",
  "Built entirely by AI agents. No human code. No agency overhead.",
  "Hire an autonomous AI operator",
  "from the autonomous system each week",
  "Autonomous Venture Builder",
];

test("public surfaces do not claim zero-human autonomous execution", () => {
  for (const claim of retiredClaims) {
    assert.equal(publicCopy.includes(claim), false, `retired autonomy claim returned: ${claim}`);
  }
});

test("public surfaces preserve the real authority and evidence boundary", () => {
  assert.match(services, /Consequential actions remain authorized/);
  assert.match(services, /does not, by itself,[\s\S]*prove zero-human execution/);
  assert.match(services, /brief is reviewed before a payment link is sent/i);
  assert.match(footer, /human-authorized where consequential actions require it/);
  assert.match(newsletter, /including what still requires human authority/);
  assert.match(servicesOg, /AI-native delivery\. Written scope\. Evidence-led results\./);
  assert.match(servicesTwitter, /AI-native delivery\. Written scope\. Evidence-led results\./);
  assert.match(defaultOg, /AI-Operated Venture Builder/);
});
