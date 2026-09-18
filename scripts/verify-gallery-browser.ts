// Verification-only branch: never merge this build override into production.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const require=createRequire('/tmp/taidurden-browser-qa/package.json');
const playwright=require('playwright-core');
const chromiumPackage=require('@sparticuz/chromium');
const chromium=chromiumPackage.default??chromiumPackage;
const base=process.env.PORTFOLIO_BROWSER_BASE_URL??'http://127.0.0.1:4321';
const server=process.env.PORTFOLIO_BROWSER_BASE_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','4321'],{stdio:'inherit',env:process.env});
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
const retired=new RegExp(['ty','dirt'].join('[\\s_-]*'),'i');
let browser:any;let checks=0;const errors:string[]=[];
try {
 let ready=false;for(let i=0;i<60;i++){try{if((await fetch(base,{signal:AbortSignal.timeout(1500)})).ok){ready=true;break;}}catch{}await sleep(500);}assert.ok(ready,'QA server ready');
 const args=chromium.args.filter((arg:string)=>!['--disable-web-security','--disable-site-isolation-trials','--allow-running-insecure-content','--single-process'].includes(arg)&&!arg.startsWith('--disable-features='));
 for(const width of [1440,390]){
  browser=await playwright.chromium.launch({headless:true,args,executablePath:await chromium.executablePath()});
  const context=await browser.newContext({viewport:{width,height:960},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));
  for(const route of ['/','/ventures/','/ventures/roofingreels/','/ventures/amble/','/ventures/little-acre-lab/','/ventures/little-lines/','/ventures/creditlatch/','/ventures/deleterail/']){
   const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:30000});assert.equal(response.status(),200);
   await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);assert.ok(!retired.test(await page.locator('body').innerText()));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`overflow ${route} ${width}`);
   const decoded=await page.evaluate(async()=>{const images=Array.from(document.querySelectorAll<HTMLImageElement>('img[data-project-image]'));for(const img of images)img.loading='eager';await Promise.all(images.map(img=>img.decode()));return images.map(i=>({slug:i.dataset.projectImage,width:i.naturalWidth,height:i.naturalHeight}));});
   assert.ok(decoded.length>0&&decoded.every((i:{width:number;height:number})=>i.width>0&&i.height>0));
   if(route==='/ventures/'){
    assert.equal(decoded.length,44);
    const group=page.getByRole('group',{name:'Filter by operating responsibility'});
    await group.getByRole('button',{name:'Shared system',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-venture]').length===6);assert.equal(await group.getByRole('button',{name:'Shared system',exact:true}).getAttribute('aria-pressed'),'true');
    await group.getByRole('button',{name:'All projects',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-venture]').length===44);
    mkdirSync('public/qa',{recursive:true});await page.screenshot({path:`public/qa/gallery-${width}.jpg`,type:'jpeg',quality:70});
    await page.locator('[data-venture="roofingreels"]').getByRole('link',{name:'Explore project'}).click();await page.waitForURL(/\/ventures\/roofingreels\/?$/);assert.equal(await page.locator('h1').innerText(),'RoofingReels');
   }
   if(route.startsWith('/ventures/')&&route!='/ventures/'&&process.env.EXPECTED_SITE_SHA)assert.equal(await page.locator('[data-site-revision]').getAttribute('data-site-revision'),process.env.EXPECTED_SITE_SHA);
   checks++;
  }
  await context.close();await browser.close();browser=null;
 }
 assert.deepEqual(errors,[],'No uncaught browser errors');
 const version=(name:string)=>JSON.parse(readFileSync(`/tmp/taidurden-browser-qa/node_modules/${name}/package.json`,'utf8')).version;
 const receipt={passed:true,base,routeViewportCases:checks,widths:[1440,390],galleryImagesEach:44,filters:true,navigation:true,noHorizontalOverflow:true,uncaughtPageErrors:errors.length,applicationSource:'f6b009acb05f6de594b3644e44af72e6297b60e5',verificationSha:process.env.VERCEL_GIT_COMMIT_SHA??null,expectedProductionSha:process.env.EXPECTED_SITE_SHA??null,at:new Date().toISOString(),playwright:version('playwright-core'),chromium:version('@sparticuz/chromium')};
 mkdirSync('public/qa',{recursive:true});writeFileSync('public/qa/receipt.json',JSON.stringify(receipt));console.log('PORTFOLIO_BROWSER_ACCEPTANCE '+JSON.stringify(receipt));
} finally {if(browser)await browser.close();if(server){server.kill('SIGTERM');await sleep(250);if(server.exitCode===null)server.kill('SIGKILL');}}
