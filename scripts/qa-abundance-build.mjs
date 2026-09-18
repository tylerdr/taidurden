// QA only. Never merge or promote this override.
import {spawnSync} from 'node:child_process';
const run=(cmd,args,env=process.env)=>{const r=spawnSync(cmd,args,{stdio:'inherit',env});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);};
run('npm',['run','build']);
run('npm',['install','--prefix','/tmp/taidurden-browser-qa','--no-package-lock','--no-audit','--no-fund','playwright-core@1.63.0','@sparticuz/chromium@153.0.0']);
run(process.execPath,['scripts/verify-abundance-browser.ts']);
