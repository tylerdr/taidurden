/** Verification-only: never merge the QA branch's build override into production. */
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('data/portfolio.json','utf8'));
const base='https://taidurden.com';
const paths=['/','/ventures/','/process/','/story/','/journal/','/newsletter/','/services/',...data.entries.map(e=>`/ventures/${e.slug}/`)];
const failures=[];
for(let i=0;i<paths.length;i+=4){await Promise.all(paths.slice(i,i+4).map(async path=>{
 try{const r=await fetch(base+path,{signal:AbortSignal.timeout(15000),cache:'no-store'});const body=await r.text();if(!r.ok||!body.includes('<h1'))throw new Error(`HTTP ${r.status} or missing h1`);
 if(path==='/ventures/'&&!data.entries.every(e=>body.includes(`data-venture="${e.slug}"`)))throw new Error('Missing project cards');
 if(path==='/journal/'&&!body.includes('Building the company'))throw new Error('Old journal');
 }catch(e){failures.push({path,error:String(e)});}
}));}
const s=await fetch(base+'/sitemap.xml',{signal:AbortSignal.timeout(15000),cache:'no-store'});const xml=await s.text();if(!s.ok||!data.entries.every(e=>xml.includes(`/ventures/${e.slug}/`)))failures.push({path:'/sitemap.xml',error:'Incomplete sitemap'});
const r=await fetch(base+'/ventures/not-a-real-project/',{signal:AbortSignal.timeout(15000),cache:'no-store'});if(r.status!==404)failures.push({path:'unknown venture',error:`Expected 404, got ${r.status}`});
const receipt={at:new Date().toISOString(),passed:failures.length===0,target:base,expectedProductionCommit:'2c306396910ee43aacaca1e3d951ebeb77d89b1c',qaCommit:process.env.VERCEL_GIT_COMMIT_SHA??null,routes:paths.length,entries:data.entries.length,sitemap:true,failures,scope:'actual public-domain HTTP/SSR; deployment revision separately verified through Vercel; not browser interaction or worker acceptance'};
console.log('LIVE_PORTFOLIO_ACCEPTANCE '+JSON.stringify(receipt));if(failures.length)process.exitCode=1;
