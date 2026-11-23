import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'static/assets/layout-canonical.css'),'utf8');
if(!html.includes('assets/layout-canonical.css'))throw Error('Canonical CSS link missing');
for(const s of ['grid-template-areas:"nav book side"','grid-area:nav','grid-area:book','grid-area:side','@media(max-width:760px)'])if(!css.includes(s))throw Error('Missing layout rule: '+s);
console.log('[LAYOUT] canonical stylesheet and grid regions verified');
