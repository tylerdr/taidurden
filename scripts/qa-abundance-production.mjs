// Verification-only branch: never merge or promote.
import {spawnSync} from 'node:child_process';
const base='https://taidurden.com',expected='5e611f7ca2a5e87063b3f2cb88ca71a222f72ec8';
const run=(cmd,args,env=process.env)=>{const r=spawnSync(cmd,args,{stdio:'inherit',env});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);};
run('npm',['run','build']);
let ready=false;for(let i=0;i<45;i++){try{const r=await fetch(base+'/ventures/getfoundinchat/',{signal:AbortSignal.timeout(5000),headers:{'cache-control':'no-cache'}});const html=await r.text();if(r.ok&&html.includes(`data-site-revision="${expected}"`)){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,1000));}
if(!ready)throw new Error('Expected production revision not observed. No live acceptance claimed.');
console.log('ACTUAL_PRODUCTION_REVISION '+expected);
const env={...process.env,EXPECTED_SITE_SHA:expected,PORTFOLIO_VERIFY_BASE_URL:base,PORTFOLIO_BROWSER_BASE_URL:base};
run(process.execPath,['scripts/verify-portfolio.mjs'],env);
run('npm',['install','--prefix','/tmp/taidurden-browser-qa','--no-package-lock','--no-audit','--no-fund','playwright-core@1.63.0','@sparticuz/chromium@153.0.0']);
run(process.execPath,['scripts/verify-abundance-browser.ts'],env);
