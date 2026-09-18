import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const read=(path:string)=>readFileSync(path,'utf8');
const manifest=JSON.parse(read('data/portfolio.json')) as {entries:{id:string;slug:string}[]};
const profiles=JSON.parse(read('data/project-profiles.json')) as Record<string,{tagline:string;audience:string;summary:string;focus:string[];visual:string}>;
const retired=new RegExp(['ty','dirt'].join('[\\s_-]*'),'i');
const kinds=new Set(['roof','film','garden','family','pencil','health','fitness','wine','pool','energy','cube','cabinet','brand','media','search','document','blueprint','network']);
test('every registered project has exactly one complete public profile',()=>{
 assert.deepEqual(Object.keys(profiles).sort(),manifest.entries.map(e=>e.id).sort());
 for(const p of Object.values(profiles)){
  assert.ok(p.tagline.length>10&&p.tagline.length<120);
  assert.ok(p.audience.length>15&&p.audience.length<200);
  assert.ok(p.summary.length>70&&p.summary.length<700);
  assert.equal(p.focus.length,3);assert.equal(new Set(p.focus).size,3);
  assert.ok(p.focus.every(f=>f.length>4&&f.length<65));assert.ok(kinds.has(p.visual));
 }
});
test('every project has a unique prerendered share-image route',()=>{
 const route=read('app/project-images/[slug]/route.ts');
 assert.match(route,/force-static/);assert.match(route,/generateStaticParams/);
 assert.match(route,/renderProjectImage/);assert.equal(new Set(manifest.entries.map(e=>`/project-images/${e.slug}`)).size,44);
});
test('cards and detail pages both display project images and useful descriptions',()=>{
 for(const path of ['components/venture-card.tsx','app/ventures/[slug]/page.tsx']){
  const source=read(path);assert.match(source,/data-project-image/);assert.match(source,/projectImagePath/);
  assert.match(source,/profile.summary/);assert.match(source,/legacyArt/);
 }
});
test('project metadata declares its own image rather than the directory sharecard',()=>{
 const source=read('app/ventures/[slug]/page.tsx');
 assert.match(source,/openGraph:\{\.\.\.base.openGraph,images:\[image\]\}/);
 assert.match(source,/twitter:\{\.\.\.base.twitter/);assert.match(source,/projectImagePath\(venture.slug\)/);
});
test('unverified products are not assigned invented functionality',()=>{
 assert.match(profiles.CreditLatch.summary,/not established/);
 assert.match(profiles.DeleteRail.summary,/No .* service is represented as available/);
 assert.match(profiles.LittleLines.summary,/drawing|artwork/);
 assert.match(profiles.PotentialPools.summary,/pool.service|pool.contractor/i);
 assert.match(profiles.SpotBundle.summary,/launch|distribution/i);
});
test('image renderer uses local editorial geometry, not remote image or model calls',()=>{
 const source=read('lib/project-image.tsx');assert.match(source,/ImageResponse/);assert.match(source,/width:1200,height:630/);
 assert.doesNotMatch(source,/fetch\(|https:\/\/|apiKey|generateImage/);
});
test('public source and text assets cannot reintroduce the retired identity',()=>{
 const scan=(dir:string)=>{for(const e of readdirSync(dir,{withFileTypes:true})){
  const p=join(dir,e.name);if(e.isDirectory())scan(p);else if(/\.(tsx?|json|svg|txt|html|md|xml)$/.test(p))assert.ok(!retired.test(read(p)),`Retired identity in ${p}`);
 }};
 for(const root of ['app','components','data','lib','public'])scan(root);
});
