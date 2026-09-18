// Verification-only branch: never merge or promote its build override.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const require=createRequire('/tmp/taidurden-browser-qa/package.json');
const playwright=require('playwright-core');
const imported=require('@sparticuz/chromium');const chromium=imported.default??imported;
const base=process.env.PORTFOLIO_BROWSER_BASE_URL??'http://127.0.0.1:4321';
const server=process.env.PORTFOLIO_BROWSER_BASE_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','4321'],{stdio:'inherit',env:process.env});
const load=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const entries=load('data/portfolio.json').entries,theses=load('data/theses.json'),taxonomy=load('data/venture-taxonomy.json').entries,excluded=load('data/portfolio-exclusions.json').slugs;
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
const retired=new RegExp(['ty','dirt'].join('[\\s_-]*'),'i');
let browser:any;let checks=0;const errors:string[]=[];
try{
 let ready=false;for(let i=0;i<60;i++){try{if((await fetch(base,{signal:AbortSignal.timeout(1500)})).ok){ready=true;break;}}catch{}await sleep(500);}assert.ok(ready,'QA server ready');
 const args=chromium.args.filter((a:string)=>!['--disable-web-security','--disable-site-isolation-trials','--allow-running-insecure-content','--single-process'].includes(a)&&!a.startsWith('--disable-features='));
 mkdirSync('public/qa',{recursive:true});
 for(const width of [1440,390]){
  browser=await playwright.chromium.launch({headless:true,args,executablePath:await chromium.executablePath()});
  const context=await browser.newContext({viewport:{width,height:960},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));
  const expectCount=async(n:number)=>{await page.waitForFunction((n:number)=>document.querySelectorAll('[data-venture]').length===n,n);};
  const noOverflow=async(label:string)=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${label} ${width}`);
  for(const route of ['/','/ventures/','/theses/',...theses.map((t:any)=>`/theses/${t.slug}/`),'/ventures/roofingreels/','/ventures/little-lines/','/ventures/creditlatch/','/ventures/deleterail/']){
   const r=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:30000});assert.equal(r.status(),200,route);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1,route);assert.ok(!retired.test(await page.locator('body').innerText()),route);await noOverflow(route);
   for(const slug of excluded)assert.equal(await page.locator(`[data-venture="${slug}"]`).count(),0);
   const decoded=await page.evaluate(async()=>{const imgs=Array.from(document.querySelectorAll<HTMLImageElement>('img[data-project-image]'));for(const i of imgs)i.loading='eager';await Promise.all(imgs.map(i=>i.decode()));return imgs.map(i=>({slug:i.dataset.projectImage,w:i.naturalWidth,h:i.naturalHeight}));});
   assert.ok(decoded.every((i:any)=>i.w>0&&i.h>0),`image decode ${route}`);
   if(route==='/ventures/'){
    assert.equal(decoded.length,32);assert.equal(await page.locator('[data-thesis-tag]').count(),32);
    await page.screenshot({path:`public/qa/thesis-directory-${width}.jpg`,type:'jpeg',quality:75});
    const group=page.getByRole('group',{name:'Filter by thesis'}),health=group.getByRole('button',{name:'AI for health optimization',exact:true});
    await health.click();await expectCount(5);assert.equal(await health.getAttribute('aria-pressed'),'true');
    await page.getByRole('combobox',{name:'Customer',exact:true}).click();await page.getByRole('option',{name:'B2B',exact:true}).click();await expectCount(0);assert.ok(await page.getByText('No projects match these filters.',{exact:true}).isVisible());
    await page.getByRole('button',{name:'Reset filters',exact:true}).click();await expectCount(32);
    await page.getByLabel('Find a project',{exact:true}).fill('Little');await expectCount(2);await page.getByRole('button',{name:'Reset filters',exact:true}).click();await expectCount(32);
    await page.locator('summary').click();
    await page.getByRole('combobox',{name:'Industry',exact:true}).click();await page.getByRole('option',{name:'Home services',exact:true}).click();await expectCount(3);
    await page.getByRole('combobox',{name:'Product format',exact:true}).click();await page.getByRole('option',{name:'Creative asset product',exact:true}).click();await expectCount(1);
    await page.getByRole('combobox',{name:'Business model hypothesis',exact:true}).click();await page.getByRole('option',{name:'One-time purchase',exact:true}).click();await expectCount(1);assert.equal(await page.locator('[data-venture]').getAttribute('data-venture'),'roofingreels');await noOverflow('combined facets');
    await page.getByRole('button',{name:'Reset filters',exact:true}).click();await expectCount(32);
    await page.locator('[data-venture="uiproof"] [data-thesis-tag]').click();await page.waitForURL(/\/theses\/agent-native-tools\/?$/);await expectCount(4);assert.equal(await page.locator('h1').innerText(),'Agent-native developer tools');
    await page.locator('[data-venture="uiproof"]').getByRole('link',{name:'Explore project',exact:false}).click();await page.waitForURL(/\/ventures\/uiproof\/?$/);assert.equal(await page.locator('h1').innerText(),'UIProof');
   }
   const thesis=theses.find((t:any)=>route===`/theses/${t.slug}/`);
   if(thesis){const expected=entries.filter((e:any)=>taxonomy[e.id].primaryThesis===thesis.slug).map((e:any)=>e.slug).sort();const shown=(await page.locator('[data-venture]').evaluateAll((els:Element[])=>els.map(e=>e.getAttribute('data-venture')))).sort();assert.deepEqual(shown,expected);assert.equal(decoded.length,expected.length);if(thesis.slug==='agent-native-tools')await page.screenshot({path:`public/qa/developer-thesis-${width}.jpg`,type:'jpeg',quality:75});}
   if(route.startsWith('/ventures/')&&route!='/ventures/'&&process.env.EXPECTED_SITE_SHA)assert.equal(await page.locator('[data-site-revision]').getAttribute('data-site-revision'),process.env.EXPECTED_SITE_SHA);
   checks++;
  }
  await context.close();await browser.close();browser=null;
 }
 assert.deepEqual(errors,[]);
 const version=(name:string)=>JSON.parse(readFileSync(`/tmp/taidurden-browser-qa/node_modules/${name}/package.json`,'utf8')).version;
 const receipt={passed:true,base,routeViewportCases:checks,widths:[1440,390],galleryImagesEach:32,thesisPages:6,thesisTags:true,combinedFilters:true,search:true,emptyState:true,reset:true,navigation:true,excludedCardsAbsent:true,noHorizontalOverflow:true,uncaughtPageErrors:errors.length,applicationSource:'19c8f9de1342960b8787f9fec64917032ed84528',verificationSha:process.env.VERCEL_GIT_COMMIT_SHA??null,expectedProductionSha:process.env.EXPECTED_SITE_SHA??null,at:new Date().toISOString(),playwright:version('playwright-core'),chromium:version('@sparticuz/chromium')};
 writeFileSync('public/qa/thesis-receipt.json',JSON.stringify(receipt,null,2));console.log('THESIS_BROWSER_ACCEPTANCE '+JSON.stringify(receipt));
}finally{if(browser)await browser.close();if(server){server.kill('SIGTERM');await sleep(250);if(server.exitCode===null)server.kill('SIGKILL');}}
