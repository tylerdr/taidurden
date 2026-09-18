import {spawn} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),sharp=require('sharp');
const json=p=>JSON.parse(readFileSync(p,'utf8'));
const data=json('data/portfolio.json'),theses=json('data/theses.json'),memberships=json('data/thesis-memberships.json').projects,excluded=json('data/portfolio-exclusions.json');
const matches=(id,slug)=>memberships[id].relations.some(r=>r.thesisId===slug);
const port=4319,base=process.env.PORTFOLIO_VERIFY_BASE_URL??`http://127.0.0.1:${port}`;
const child=process.env.PORTFOLIO_VERIFY_BASE_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',String(port)],{stdio:'inherit',env:process.env});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const retired=new RegExp(['ty','dirt'].join('[\\s_-]*'),'i');
const get=path=>fetch(base+path,{signal:AbortSignal.timeout(20000)});
const hashes=new Set();
try{
 let ready=false;for(let i=0;i<60;i++){if(child&&child.exitCode!==null)throw new Error('Server exited');try{if((await get('/')).ok){ready=true;break;}}catch{}await sleep(500);}if(!ready)throw new Error('Server not ready');
 const paths=['/','/ventures/','/theses/','/process/','/story/','/journal/','/newsletter/','/services/',...data.entries.map(e=>`/ventures/${e.slug}/`),...theses.map(t=>`/theses/${t.slug}/`)];
 for(const path of paths){const r=await get(path),html=await r.text();if(!r.ok||!html.includes('<h1'))throw new Error(`Failed page ${path}`);if(retired.test(html))throw new Error(`Retired identity at ${path}`);
  for(const slug of excluded.slugs)if(html.includes(`data-venture="${slug}"`)||new RegExp(`href="/ventures/${slug}/?"`).test(html))throw new Error(`Excluded project linked at ${path}: ${slug}`);
  if(path==='/ventures/'){
   const cards=[...html.matchAll(/<article\b[^>]*data-venture="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)];
   if(cards.length!==data.entries.length||new Set(cards.map(m=>m[1])).size!==cards.length)throw new Error('Gallery contains missing or duplicate products');
   for(const e of data.entries){const card=cards.find(m=>m[1]===e.slug)?.[2];if(!card||!card.includes(`data-project-image="${e.slug}"`))throw new Error(`Missing image ${e.slug}`);for(const relation of memberships[e.id].relations)if(!card.includes(`data-thesis-tag="${relation.thesisId}"`))throw new Error(`Missing relation on card ${e.slug}: ${relation.thesisId}`);}
  }
  const e=data.entries.find(e=>path===`/ventures/${e.slug}/`);if(e){if(!html.includes('Who it is for')||!html.includes('Product focus')||!html.includes('The product profile')||!html.includes('Why I am building this'))throw new Error(`Missing profile ${e.slug}`);
   for(const relation of memberships[e.id].relations)if(!html.includes(`data-thesis-fit="${relation.thesisId}"`))throw new Error(`Missing fit ${e.slug}`);
   const image=`https://taidurden.com/project-images/${e.slug}`,tags=html.match(/<meta\b[^>]*>/g)??[];
   if(!tags.some(t=>t.includes('property="og:image"')&&t.includes(`content="${image}"`))||!tags.some(t=>t.includes('name="twitter:image"')&&t.includes(`content="${image}"`)))throw new Error(`Image metadata mismatch ${e.slug}`);
   if(process.env.EXPECTED_SITE_SHA&&!html.includes(`data-site-revision="${process.env.EXPECTED_SITE_SHA}"`))throw new Error(`Production revision mismatch ${e.slug}`);
  }
  const thesis=theses.find(t=>path===`/theses/${t.slug}/`);if(thesis){const expected=data.entries.filter(e=>matches(e.id,thesis.slug));const cards=[...html.matchAll(/data-venture="([^"]+)"/g)].map(m=>m[1]);if(cards.length!==expected.length||new Set(cards).size!==cards.length||!expected.every(e=>cards.includes(e.slug)))throw new Error(`Wrong thesis group ${thesis.slug}`);}
 }
 for(const e of data.entries){const r=await get(`/project-images/${e.slug}`);if(!r.ok||!r.headers.get('content-type')?.includes('image/png'))throw new Error(`Missing PNG ${e.slug}`);const b=Buffer.from(await r.arrayBuffer()),decoded=await sharp(b).raw().toBuffer({resolveWithObject:true});if(decoded.info.width!==1200||decoded.info.height!==630||decoded.data.length<1200*630*3)throw new Error(`Invalid pixels ${e.slug}`);const h=createHash('sha256').update(b).digest('hex');if(hashes.has(h))throw new Error(`Duplicate image ${e.slug}`);hashes.add(h);if(b.length<5000||b.length>1500000)throw new Error(`Image size ${e.slug}`);}
 const legacy=['peakedlabs','protocolrank','shreddify','ai-business-blueprint','alivelongevity','ohio-power-picker','getfoundinchat','ogfixer','aiopsguide','winemakeros','hireagentbuilders','portcoaudit'];
 for(const s of legacy){const r=await get(`/sharecards/${s}.png`);if(!r.ok)throw new Error(`Legacy artwork missing ${s}`);await sharp(Buffer.from(await r.arrayBuffer())).raw().toBuffer();}
 const absent=['/ventures/not-a-real-project/','/project-images/not-a-real-project','/theses/not-a-real-thesis/',...excluded.slugs.flatMap(s=>[`/ventures/${s}/`,`/project-images/${s}`]),`/ventures/${['ty','dirt'].join('-')}/`];
 for(const path of absent)if((await get(path)).status!==404)throw new Error(`Excluded/unknown route remains ${path}`);
 const sr=await get('/sitemap.xml'),s=await sr.text();if(!sr.ok||retired.test(s)||!data.entries.every(e=>s.includes(`/ventures/${e.slug}`))||!theses.every(t=>s.includes(`/theses/${t.slug}`)))throw new Error('Sitemap incomplete');for(const slug of excluded.slugs)if(new RegExp(`/ventures/${slug}(?:<|/)`).test(s))throw new Error(`Excluded sitemap entry ${slug}`);
 console.log('ABUNDANCE_PORTFOLIO_ACCEPTANCE '+JSON.stringify({passed:true,base,routes:paths.length,uniqueProducts:data.entries.length,overlappingTheses:theses.length,allMembershipTags:true,getFoundInChatTheses:memberships.GetFoundInChat.relations.map(r=>r.thesisId),excludedRoutes404:excluded.slugs.length,uniqueDecodedImages:hashes.size,preservedBrandImages:legacy.length,canonicalIdentity:true,sitemap:true,sha:process.env.EXPECTED_SITE_SHA??process.env.VERCEL_GIT_COMMIT_SHA??null,at:new Date().toISOString(),scope:'HTTP/SSR and decoded images; interactive browser acceptance is separate'}));
}finally{if(child){child.kill('SIGTERM');await sleep(250);if(child.exitCode===null)child.kill('SIGKILL');}}
