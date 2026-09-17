import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const data=JSON.parse(read('data/portfolio.json'));
test('all 44 registered entries present',()=>assert.equal(data.entries.length,44));
test('unique safe routes',()=>{const slugs=data.entries.map(e=>e.slug);assert.equal(new Set(slugs).size,slugs.length);assert.ok(slugs.every(s=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)));});
test('legacy public routes retained',()=>{for(const s of ['peakedlabs','protocolrank','shreddify','ai-business-blueprint','alivelongevity','ohio-power-picker','getfoundinchat','ogfixer','aiopsguide','winemakeros','hireagentbuilders','portcoaudit'])assert.ok(data.entries.some(e=>e.slug===s));});
test('responsibilities separated',()=>{assert.equal(data.entries.filter(e=>e.mode==='agent-led').length,33);assert.equal(data.entries.filter(e=>e.mode==='shared').length,6);assert.equal(data.entries.filter(e=>e.mode==='tyler-led').length,3);assert.equal(data.entries.filter(e=>e.mode==='linked').length,2);});
test('projection contains only public allowlisted keys',()=>{const keys=['id','slug','name','mode','family','publicUrl','valueEvent','definitionStatus'];for(const e of data.entries)assert.deepEqual(Object.keys(e).sort(),[...keys].sort());});
test('only HTTPS registered links',()=>{for(const e of data.entries)if(e.publicUrl){const u=new URL(e.publicUrl);assert.equal(u.protocol,'https:');assert.equal(u.username,'');assert.equal(u.password,'');}});
test('proposed value claims are explicitly labeled',()=>{assert.match(data.notice,/proposed acceptance targets/);assert.ok(data.entries.every(e=>e.valueEvent&&e.definitionStatus));});
test('homepage removes unsupported autonomy assertion',()=>{const home=read('app/page.tsx');assert.doesNotMatch(home,/Full autonomous AI|Zero human code|Live Portfolio Terminal/);assert.match(home,/Not|not/);});
test('cards use only labeled existing art, not invented screenshots or metrics',()=>{const card=read('components/venture-card.tsx');assert.doesNotMatch(card,/deployedPages|animate-pulse/);assert.match(card,/legacyArt/);assert.match(card,/not a current product screenshot/);});
test('directory filters expose pressed state',()=>assert.match(read('components/venture-directory.tsx'),/aria-pressed/));
test('journal distinguishes synthetic tests and running businesses',()=>assert.match(read('app/journal/page.tsx'),/does not prove/));
test('existing subscribe route is not replaced by this change',()=>assert.match(read('app/page.tsx'),/NewsletterSignupForm/));

test('sitemap derives all registered routes',()=>{assert.match(read('app/sitemap.ts'),/ventures.map/);assert.match(read('app/sitemap.ts'),/journal/);});
