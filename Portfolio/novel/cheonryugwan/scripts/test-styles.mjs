import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const expected=['design-tokens.css','foundation-legacy.css','components-legacy.css','layout-canonical.css','home-v0928.css','design-components.css','archive-unified.css','cinematic-waterfall-book.css','visual-polish-v0937.css'];
if(/<style(?:\s|>)/i.test(html))throw Error('Inline style block remains in index.html');
let last=-1;
for(const file of expected){
 const href=`assets/${file}`;
 const at=html.indexOf(`href="${href}"`);
 if(at<0||at<=last)throw Error(`Missing or out-of-order CSS: ${href}`);
 if(!fs.statSync(path.join(root,'static',href),{throwIfNoEntry:false})?.isFile())throw Error(`Missing CSS file: ${href}`);
 last=at;
}
console.log('[STYLES] Nine CSS layers found in controlled cascade order');
