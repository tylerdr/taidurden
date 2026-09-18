// Verification only. Never merge this build override into the application.
import {spawnSync} from 'node:child_process';
function run(command,args,env=process.env){const r=spawnSync(command,args,{stdio:'inherit',env});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);}
run('npm',['run','build']);
run('npm',['install','--prefix','/tmp/taidurden-browser-qa','--no-package-lock','--no-audit','--no-fund','playwright-core@1.63.0','@sparticuz/chromium@153.0.0']);
run(process.execPath,['scripts/verify-theses-browser.ts']);
