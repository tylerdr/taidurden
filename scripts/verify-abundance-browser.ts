// QA-only verification. No customer forms are submitted.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const require=createRequire('/tmp/taidurden-browser-qa/package.json');
const {chromium:pw}=require('playwright-core'),imported=require('@sparticuz/chromium'),chromium=imported.default??imported;
const json=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const products=json('data/portfolio.json').entries,theses=json('data/theses.json'),members=json('data/thesis-memberships.json').projects,excluded=json('data/portfolio-exclusions.json').slugs;
const group=(slug:string)=>products.filter((p:any)=>members[p.id].relations.some((r:any)=>r.thesisId===slug)).map((p:any)=>p.slug).sort();
const base=process.env.PORTFOLIO_BROWSER_BASE_URL??'http://127.0.0.1:4321';
const server=process.env.PORTFOLIO_BROWSER_BASE_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','4321'],{stdio:'inherit',env:process.env});
const sleep=(n:number)=>new Promise(r=>setTimeout(r,n));let browser:any;const errors:string[]=[];let cases=0;
try{
 let ready=false;for(let i=0;i<60;i++){try{if((await fetch(base,{signal:AbortSignal.timeout(1500)})).ok){ready=true;break;}}catch{}await sleep(500);}assert.ok(ready);
 const args=chromium.args.filter((a:string)=>!['--disable-web-security','--disable-site-isolation-trials','--allow-running-insecure-content','--single-process'].includes(a)&&!a.startsWith('--disable-features='));
 mkdirSync('public/qa',{recursive:true});
 for(const width of [1440,390]){
  browser=await pw.launch({headless:true,args,executablePath:await chromium.executablePath()});
  const context=await browser.newContext({viewport:{width,height:960},deviceScaleFactor:1,reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',(e:Error)=>errors.push(e.message));
  const count=async(n:number)=>page.waitForFunction((expected:number)=>document.querySelectorAll('[data-venture]').length===expected,n);
  const routes=['/','/story/','/theses/','/ventures/',...theses.map((t:any)=>`/theses/${t.slug}/`),'/ventures/getfoundinchat/','/ventures/uiproof/','/ventures/brighter-postpartum/'];
  for(const path of routes){
   const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:30000});assert.equal(response.status(),200,path);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('h1').count(),1,path);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width} ${path}`);
   const images=await page.evaluate(async()=>{const list=Array.from(document.querySelectorAll<HTMLImageElement>('img[data-project-image]'));for(const i of list)i.loading='eager';await Promise.all(list.map(i=>i.decode()));return list.map(i=>i.naturalWidth);});assert.ok(images.every((w:number)=>w>0));
   for(const slug of excluded)assert.equal(await page.locator(`[data-venture="${slug}"]`).count(),0);
   if(path==='/story/'){assert.match(await page.locator('body').innerText(),/first use case, not a completed case study/);await page.screenshot({path:`public/qa/manifesto-${width}.jpg`,type:'jpeg',quality:65});}
   if(path==='/'){assert.match(await page.locator('h1').innerText(),/So humans can build a life/);await page.screenshot({path:`public/qa/home-${width}.jpg`,type:'jpeg',quality:65});}
   if(path==='/ventures/'){
    assert.equal(images.length,32);assert.equal(await page.locator('[data-venture="getfoundinchat"] [data-thesis-tag]').count(),3);
    const filters=page.getByRole('group',{name:'Filter by thesis'});
    for(const slug of ['agent-native-tools','smb-transformation','growth-commerce']){const title=theses.find((t:any)=>t.slug===slug).title;await filters.getByRole('button',{name:title,exact:true}).click();await count(group(slug).length);assert.equal(await page.locator('[data-venture="getfoundinchat"]').count(),1);}
    await filters.getByRole('button',{name:'Healthspan, Not Hustle',exact:true}).click();await count(group('health-optimization').length);await page.getByRole('combobox',{name:'Customer',exact:true}).click();await page.getByRole('option',{name:'B2B',exact:true}).click();await count(0);assert.ok(await page.getByText('No projects match these filters.',{exact:true}).isVisible());
    await page.getByRole('button',{name:'Reset filters',exact:true}).click();await count(32);await page.getByLabel('Find a project',{exact:true}).fill('GetFound');await count(1);await page.getByRole('button',{name:'Reset filters',exact:true}).click();await count(32);
    await page.locator('summary').click();await page.getByRole('combobox',{name:'Industry',exact:true}).click();await page.getByRole('option',{name:'Home services',exact:true}).click();await count(3);await page.getByRole('combobox',{name:'Product format',exact:true}).click();await page.getByRole('option',{name:'Creative asset product',exact:true}).click();await count(1);await page.getByRole('combobox',{name:'Business model hypothesis',exact:true}).click();await page.getByRole('option',{name:'One-time purchase',exact:true}).click();await count(1);assert.equal(await page.locator('[data-venture]').getAttribute('data-venture'),'roofingreels');await page.getByRole('button',{name:'Reset filters',exact:true}).click();await count(32);
    await page.screenshot({path:`public/qa/products-${width}.jpg`,type:'jpeg',quality:65});
   }
   const thesis=theses.find((t:any)=>path===`/theses/${t.slug}/`);if(thesis){const ids=(await page.locator('[data-venture]').evaluateAll((els:Element[])=>els.map(e=>e.getAttribute('data-venture')))).sort();assert.deepEqual(ids,group(thesis.slug));assert.equal(ids.length,new Set(ids).size);assert.equal(await page.locator('h1').innerText(),thesis.title);}
   if(path==='/ventures/getfoundinchat/'){
    assert.equal(await page.locator('[data-thesis-fit]').count(),3);assert.equal(await page.locator('[data-thesis-tag]').count(),3);await page.screenshot({path:`public/qa/getfoundinchat-${width}.jpg`,type:'jpeg',quality:65});
    for(const slug of ['agent-native-tools','smb-transformation','growth-commerce']){await page.locator(`[data-thesis-tag="${slug}"]`).click();await page.waitForURL(new RegExp(`/theses/${slug}/?$`));await count(group(slug).length);await page.getByRole('button',{name:'Reset filters',exact:true}).click();await count(group(slug).length);await page.locator('[data-venture="getfoundinchat"]').getByRole('link',{name:'Explore project',exact:false}).click();await page.waitForURL(/\/ventures\/getfoundinchat\/?$/);}
   }
   if(process.env.EXPECTED_SITE_SHA&&path.startsWith('/ventures/')&&path!='/ventures/')assert.equal(await page.locator('[data-site-revision]').getAttribute('data-site-revision'),process.env.EXPECTED_SITE_SHA);
   cases++;
  }
  await context.close();await browser.close();browser=null;
 }
 assert.deepEqual(errors,[]);
 const result={passed:true,base,routeViewportCases:cases,widths:[1440,390],uniqueProducts:32,thesisGroups:6,getFoundInChatMemberships:3,allGroupsExact:true,multipleTags:true,clientThesisNavigation:true,combinedFilters:true,searchResetEmptyStates:true,imagesDecoded:true,noHorizontalOverflow:true,uncaughtPageErrors:0,applicationSource:'8ab83541605cd6db528dc74713f47b41fbdb7f44',verificationSha:process.env.VERCEL_GIT_COMMIT_SHA??null,expectedProductionSha:process.env.EXPECTED_SITE_SHA??null,at:new Date().toISOString()};
 writeFileSync('public/qa/abundance-receipt.json',JSON.stringify(result,null,2));console.log('ABUNDANCE_BROWSER_ACCEPTANCE '+JSON.stringify(result));
}finally{if(browser)await browser.close();if(server){server.kill('SIGTERM');await sleep(250);if(server.exitCode===null)server.kill('SIGKILL');}}
