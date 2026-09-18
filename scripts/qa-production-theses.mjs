// Production verification ONLY; never merge or promote this branch/configuration.
import {spawnSync} from 'node:child_process';
const expected='f865027016e9204dc89d655b75f1b5302961dc7e',base='https://taidurden.com';
function run(command,args,env=process.env){const r=spawnSync(command,args,{stdio:'inherit',env});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);}
run('npm',['run','build']);
let ready=false;
for(let attempt=0;attempt<45;attempt++){
 try{const r=await fetch(`${base}/ventures/uiproof/`,{signal:AbortSignal.timeout(5000),headers:{'cache-control':'no-cache'}});const html=await r.text();if(r.ok&&html.includes(`data-site-revision="${expected}"`)){ready=true;break;}}catch{}
 await new Promise(resolve=>setTimeout(resolve,1000));
}
if(!ready)throw new Error('Expected production revision was not observed; no production acceptance claimed.');
console.log('ACTUAL_PRODUCTION_REVISION '+expected);
const env={...process.env,EXPECTED_SITE_SHA:expected,PORTFOLIO_VERIFY_BASE_URL:base,PORTFOLIO_BROWSER_BASE_URL:base};
run(process.execPath,['scripts/verify-portfolio.mjs'],env);
run('npm',['install','--prefix','/tmp/taidurden-browser-qa','--no-package-lock','--no-audit','--no-fund','playwright-core@1.63.0','@sparticuz/chromium@153.0.0']);
run(process.execPath,['scripts/verify-theses-browser.ts'],env);
