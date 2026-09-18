import {spawn} from 'node:child_process';
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('data/portfolio.json','utf8'));
const port=4319,base=process.env.PORTFOLIO_VERIFY_BASE_URL??`http://127.0.0.1:${port}`;
const child=process.env.PORTFOLIO_VERIFY_BASE_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',String(port)],{stdio:'inherit',env:process.env});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const retired=new RegExp(['ty','dirt'].join('[\\s_-]*'),'i');
try {
 let ready=false;
 for(let i=0;i<60;i++){if(child&&child.exitCode!==null)throw new Error('Server exited');try{const r=await fetch(base,{signal:AbortSignal.timeout(1500)});if(r.ok){ready=true;break;}}catch{}await sleep(500);}
 if(!ready)throw new Error('Built server did not become ready');
 const paths=['/','/ventures/','/process/','/story/','/journal/','/newsletter/','/services/',...data.entries.map(e=>`/ventures/${e.slug}/`)];
 for(const path of paths){const r=await fetch(base+path,{signal:AbortSignal.timeout(15000)});const html=await r.text();if(!r.ok||!html.includes('<h1'))throw new Error(`Failed route ${path}: ${r.status}`);if(retired.test(html))throw new Error(`Retired identity found at ${path}`);if(path==='/ventures/'&&!data.entries.every(e=>html.includes(`data-venture="${e.slug}"`)))throw new Error('Missing portfolio entry');}
 const missing=await fetch(base+'/ventures/not-a-real-project/',{signal:AbortSignal.timeout(15000)});if(missing.status!==404)throw new Error('Unknown venture did not return 404');
 const sitemap=await fetch(base+'/sitemap.xml',{signal:AbortSignal.timeout(15000)});const sitemapText=await sitemap.text();if(!sitemap.ok||retired.test(sitemapText)||!data.entries.every(e=>sitemapText.includes(`/ventures/${e.slug}`)))throw new Error('Invalid sitemap identity/coverage');
 console.log('PORTFOLIO_SSR_ACCEPTANCE '+JSON.stringify({passed:true,base,routes:paths.length,canonicalIdentity:true,sitemap:true,unknownRoute404:true,entryCount:data.entries.length,sha:process.env.VERCEL_GIT_COMMIT_SHA??null,at:new Date().toISOString(),scope:'real HTTP/SSR; not browser interaction or worker/customer acceptance'}));
} finally {if(child){child.kill('SIGTERM');await sleep(250);if(child.exitCode===null)child.kill('SIGKILL');}}
