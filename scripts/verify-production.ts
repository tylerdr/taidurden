// Verification-only orchestration; this script never deploys or mutates production.
import {execFileSync} from 'node:child_process';
const expected='32603853adf43b021089ad850890fb1876b90faa';
const node=process.execPath;
execFileSync(node,['scripts/wait-production.ts'],{stdio:'inherit',timeout:180000});
execFileSync(node,['scripts/verify-portfolio.mjs'],{stdio:'inherit',timeout:180000,env:{...process.env,PORTFOLIO_VERIFY_BASE_URL:'https://taidurden.com',EXPECTED_SITE_SHA:expected}});
execFileSync('npm',['install','--prefix','/tmp/taidurden-browser-qa','--no-package-lock','--no-audit','--no-fund','playwright-core@1.63.0','@sparticuz/chromium@153.0.0'],{stdio:'inherit',timeout:180000});
execFileSync(node,['scripts/verify-gallery-browser.ts'],{stdio:'inherit',timeout:180000,env:{...process.env,PORTFOLIO_BROWSER_BASE_URL:'https://taidurden.com',EXPECTED_SITE_SHA:expected}});
