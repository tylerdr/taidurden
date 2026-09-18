import {spawn} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('sharp');
const data=JSON.parse(readFileSync('data/portfolio.json','utf8'));
const profiles=JSON.parse(readFileSync('data/project-profiles.json','utf8'));
const port=4319,base=process.env.PORTFOLIO_VERIFY_BASE_URL??`http://127.0.0.1:${port}`;
const child=process.env.PORTFOLIO_VERIFY_BASE_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',String(port)],{stdio:'inherit',env:process.env});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const retired=new RegExp(['ty','dirt'].join('[\\s_-]*'),'i');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const fetchText=async path=>{const r=await fetch(base+path,{signal:AbortSignal.timeout(20000)});return {r,html:await r.text()};};
const imageHashes=new Set();
try {
 let ready=false;
 for(let i=0;i<60;i++){if(child&&child.exitCode!==null)throw new Error('Server exited');try{const r=await fetch(base,{signal:AbortSignal.timeout(1500)});if(r.ok){ready=true;break;}}catch{}await sleep(500);}
 if(!ready)throw new Error('Built server did not become ready');
 const paths=['/','/ventures/','/process/','/story/','/journal/','/newsletter/','/services/',...data.entries.map(e=>`/ventures/${e.slug}/`)];
 for(const path of paths){
  const {r,html}=await fetchText(path);if(!r.ok||!html.includes('<h1'))throw new Error(`Failed route ${path}: ${r.status}`);
  if(retired.test(html))throw new Error(`Retired identity found at ${path}`);
  if(path==='/ventures/'&&!data.entries.every(e=>html.includes(`data-venture="${e.slug}"`)&&html.includes(`data-project-image="${e.slug}"`)))throw new Error('Missing portfolio card/image');
  const entry=data.entries.find(e=>path===`/ventures/${e.slug}/`);
  if(entry){
   if(!html.includes('Who it is for')||!html.includes('Product focus'))throw new Error(`Missing profile content: ${entry.slug}`);
   const image=`https://taidurden.com/project-images/${entry.slug}`;
   const tags=html.match(/<meta\b[^>]*>/g)??[];
   if(!tags.some(t=>t.includes('property="og:image"')&&t.includes(`content="${image}"`)))throw new Error(`Wrong OG metadata: ${entry.slug}`);
   if(!tags.some(t=>t.includes('name="twitter:image"')&&t.includes(`content="${image}"`)))throw new Error(`Wrong Twitter metadata: ${entry.slug}`);
   if(process.env.EXPECTED_SITE_SHA&&!html.includes(`data-site-revision="${process.env.EXPECTED_SITE_SHA}"`))throw new Error(`Wrong production revision: ${entry.slug}`);
  }
 }
 for(const entry of data.entries){
  const r=await fetch(base+`/project-images/${entry.slug}`,{signal:AbortSignal.timeout(20000)});
  if(!r.ok||!r.headers.get('content-type')?.includes('image/png'))throw new Error(`Invalid image response: ${entry.slug}`);
  const bytes=Buffer.from(await r.arrayBuffer());
  const decoded=await sharp(bytes).raw().toBuffer({resolveWithObject:true});
  if(decoded.info.width!==1200||decoded.info.height!==630||decoded.data.length<1200*630*3)throw new Error(`Invalid image pixels: ${entry.slug}`);
  const digest=hash(bytes);if(imageHashes.has(digest))throw new Error(`Duplicate share image: ${entry.slug}`);imageHashes.add(digest);
  if(bytes.length<5000||bytes.length>1500000)throw new Error(`Unexpected image size: ${entry.slug}`);
 }
 const legacy=['peakedlabs','protocolrank','shreddify','ai-business-blueprint','alivelongevity','ohio-power-picker','getfoundinchat','ogfixer','aiopsguide','winemakeros','hireagentbuilders','portcoaudit'];
 for(const slug of legacy){const r=await fetch(base+`/sharecards/${slug}.png`,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw new Error(`Missing legacy art: ${slug}`);await sharp(Buffer.from(await r.arrayBuffer())).raw().toBuffer();}
 for(const path of ['/ventures/not-a-real-project/','/project-images/not-a-real-project']){const r=await fetch(base+path,{signal:AbortSignal.timeout(15000)});if(r.status!==404)throw new Error(`Unknown route did not return 404: ${path}`);}
 const {r:sitemap,html:sitemapText}=await fetchText('/sitemap.xml');if(!sitemap.ok||retired.test(sitemapText)||!data.entries.every(e=>sitemapText.includes(`/ventures/${e.slug}`)))throw new Error('Invalid sitemap identity/coverage');
 console.log('PORTFOLIO_SSR_ACCEPTANCE '+JSON.stringify({passed:true,base,routes:paths.length,canonicalIdentity:true,sitemap:true,unknownRoutes404:true,entryCount:data.entries.length,profileCount:Object.keys(profiles).length,uniqueDecodedProjectImages:imageHashes.size,preservedDecodedBrandImages:legacy.length,imageDimensions:'1200x630',sha:process.env.EXPECTED_SITE_SHA??process.env.VERCEL_GIT_COMMIT_SHA??null,at:new Date().toISOString(),scope:'real HTTP/SSR, per-project metadata and fully decoded images; not browser interaction or customer acceptance'}));
} finally {if(child){child.kill('SIGTERM');await sleep(250);if(child.exitCode===null)child.kill('SIGKILL');}}
