import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = (path: string): string => readFileSync(resolve(process.cwd(), path), 'utf8');
const portfolio = JSON.parse(source('data/portfolio.json')) as {
  entries: {id: string; slug: string; name: string; mode: string}[];
};

test('portfolio retains a single canonical Tai Durden identity', () => {
  const identities = portfolio.entries.filter(entry => entry.id === 'TaiDurden');
  assert.equal(identities.length, 1);
  assert.equal(identities[0].name, 'Tai Durden');
  assert.equal(identities[0].slug, 'tai-durden');
  assert.equal(identities[0].mode, 'shared');
});

test('portfolio identities and route slugs remain unique', () => {
  assert.ok(portfolio.entries.length >= 44);
  assert.equal(new Set(portfolio.entries.map(e => e.id)).size, portfolio.entries.length);
  assert.equal(new Set(portfolio.entries.map(e => e.slug)).size, portfolio.entries.length);
});

test('root and section sharecard labels use the same name', () => {
  for (const path of [
    'app/opengraph-image.tsx', 'app/twitter-image.tsx',
    'app/story/opengraph-image.tsx', 'app/story/twitter-image.tsx',
    'app/ventures/opengraph-image.tsx', 'app/ventures/twitter-image.tsx',
  ]) assert.match(source(path), /alt="Tai Durden — Building the company that builds companies"/);
  assert.match(source('lib/share-image.tsx'), />TAI DURDEN · SPRINTER</);
});

test('public process names Amble as business authority and Vault as reference', () => {
  const text = source('app/process/page.tsx');
  assert.match(text, /Amble at app\.sprinter\.ai owns venture theses, decisions, work, approvals and learning/);
  assert.match(text, /SprinterVault is reference-only/);
  assert.match(text, /ChatGPT Pro supplies strategic insights and PRs/);
  assert.match(text, /Sprinter Platform extracts tested Amble\/Praxium capabilities/);
});

test('header and site configuration use the canonical name without duplicate labels', () => {
  assert.match(source('lib/site.ts'), /name:"Tai Durden", url:"https:\/\/taidurden\.com"/);
  assert.match(source('components/site-header.tsx'), /Tai Durden <span[^>]+>\/\/ Sprinter<\/span>/);
  assert.doesNotMatch(source('components/site-header.tsx'), /\/\/ Tai Durden/);
});

test('release notes do not reuse prior verification as current acceptance', () => {
  const notes = source('docs/PARALLEL-FLEET-RELEASE.md');
  assert.match(notes, /Historical validation recorded for the prior portfolio release/);
  assert.match(notes, /No live Amble synchronization is claimed/);
  assert.match(notes, /full application build, responsive browser QA and production deployment must be verified separately/);
});
