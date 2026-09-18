// Verification-only branch: never merge this build override into production.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
const require=createRequire(import.meta.url);
const playwright=require('/tmp/taidurden-browser-qa/node_modules/playwright-core');
const chromium=require('/tmp/taidurden-browser-qa/node_modules/@sparticuz/chromium');
const base=process.env.PORTFOLIO_BROWSER_BASE_URL??'http://127.0.0.1:4321';
const server=process.env.PORTFOLIO_BROWSER_BASE_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','4321'],{stdio:'inherit',env:process.env});
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
const retired=new RegExp(['ty','dirt'].join('[\\s_-]*'),'i');
let browser:any;let checks=0;const errors:string[]=[];
try {
 let ready=false;for(let i=0;i<60;i++){try{if((await fetch(base,{signal:AbortSignal.timeout(1500)})).ok){ready=true;break;}}catch{}await sleep(500);}assert.ok(ready,'QA server ready');
 const args=chromium.args.filter((arg:string)=>!['--disable-web-security','--disable-site-isolation-trials','--allow-running-insecure-content'].includes(arg));
 browser=await playwright.chromium.launch({headless:true,args,executablePath:await chromium.executablePath()});
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:960},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',(e:Error)=>errors.push(e.message));
  for(const route of ['/','/ventures/','/ventures/roofingreels/','/ventures/amble/','/ventures/little-acre-lab/','/ventures/little-lines/']){
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
    await page.locator('[data-venture="roofingreels"]').getByRole('link',{name:'Explore project'}).click();await page.waitForURL('**/ventures/roofingreels/');assert.equal(await page.locator('h1').innerText(),'RoofingReels');
   }
   if(route.startsWith('/ventures/')&&route!='/ventures/'&&process.env.EXPECTED_SITE_SHA)assert.equal(await page.locator('[data-site-revision]').getAttribute('data-site-revision'),process.env.EXPECTED_SITE_SHA);
   checks++;
  }
  await context.close();
 }
 assert.deepEqual(errors,[],'No uncaught browser errors');
 const receipt={passed:true,base,routeViewportCases:checks,widths:[1440,390],galleryImagesEach:44,filters:true,navigation:true,noHorizontalOverflow:true,uncaughtPageErrors:errors.length,applicationSource:'3b01678ef077efa95b50b82b36dc28d9c084f075',verificationSha:process.env.VERCEL_GIT_COMMIT_SHA??null,expectedProductionSha:process.env.EXPECTED_SITE_SHA??null,at:new Date().toISOString(),playwright:require('/tmp/taidurden-browser-qa/node_modules/playwright-core/package.json').version,chromium:require('/tmp/taidurden-browser-qa/node_modules/@sparticuz/chromium/package.json').version};
 mkdirSync('public/qa',{recursive:true});writeFileSync('public/qa/receipt.json',JSON.stringify(receipt));console.log('PORTFOLIO_BROWSER_ACCEPTANCE '+JSON.stringify(receipt));
 for(const url of ['https://creditlatch.vercel.app','https://deleterail.vercel.app']){try{const r=await fetch(url,{signal:AbortSignal.timeout(12000)});const html=await r.text();const title=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];const cleaned=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').slice(0,4200);console.log('PUBLIC_PROFILE_SOURCE '+JSON.stringify({url,status:r.status,title,text:cleaned,at:new Date().toISOString()}));}catch(e){console.log('PUBLIC_PROFILE_SOURCE '+JSON.stringify({url,error:String(e)}));}}
} finally {if(browser)await browser.close();if(server){server.kill('SIGTERM');await sleep(250);if(server.exitCode===null)server.kill('SIGKILL');}}
