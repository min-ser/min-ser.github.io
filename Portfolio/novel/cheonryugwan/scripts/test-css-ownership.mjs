import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..','static','assets');
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const shared=read('design-components.css'), tokens=read('design-tokens.css'), pages=read('archive-unified.css');
for(const rule of ['.shell>.top{','.shell>.footer{',':where(.archive-list']) {
 if(!shared.includes(rule)||pages.includes(rule)) throw Error(`CSS ownership violation: ${rule}`);
}
for(const token of ['--crg-archive-bg:','--crg-gold-gradient:','--crg-paper-ink:']) {
 if(!tokens.includes(token)||pages.includes(token)) throw Error(`Token ownership violation: ${token}`);
}
if(pages.includes(':focus-visible{outline:2px solid var(--crg-gold)'))throw Error('Duplicate shared focus rule');
console.log('[CSS OWNERSHIP] Shared tokens, chrome, panels and page rules separated');

if(!shared.includes("#main>.page .heading h1,#main>.page .heading h2") || pages.includes("text-shadow:0 3px 12px #0007")) throw Error("Heading typography ownership mismatch");
