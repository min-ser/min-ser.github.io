// Optional local browser smoke test. Uses a standalone preview fixture, never production content.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
const preview=process.env.CRG_PREVIEW_FILE;
if(!preview || !fs.existsSync(preview)){
 console.log('[BROWSER] Set CRG_PREVIEW_FILE to a standalone preview HTML for browser verification.');
 process.exit(0);
}
const bin=process.env.CHROMIUM_BIN||'chromium';
const r=spawnSync(bin,['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--virtual-time-budget=2500','--dump-dom','file://'+preview],{encoding:'utf8',timeout:20000,maxBuffer:15*1024*1024});
if(r.error||r.status!==0)throw Error('Chromium unavailable or failed: '+(r.error?.message||r.stderr?.slice(-500)));
if(!r.stdout.includes('cinema-library')&&!r.stdout.includes('immersive-reader'))throw Error('Main UI did not render');
console.log('[BROWSER] Main UI rendered');
