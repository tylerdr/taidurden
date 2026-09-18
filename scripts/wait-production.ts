// Verification-only: wait for the exact already-merged public deployment, never deploy it.
const expected='32603853adf43b021089ad850890fb1876b90faa';
let accepted=false;
for(let i=0;i<24;i++){
 try {const r=await fetch('https://taidurden.com/ventures/roofingreels/',{signal:AbortSignal.timeout(10000)});const html=await r.text();if(r.ok&&html.includes(`data-site-revision="${expected}"`)){accepted=true;break;}}catch{}
 await new Promise(r=>setTimeout(r,5000));
}
if(!accepted)throw new Error('Expected production revision did not become available');
console.log('ACTUAL_PRODUCTION_REVISION '+expected);
export {};
