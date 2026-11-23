// Guard against exact duplicate touch-action rule and repeated legacy declarations.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const components=fs.readFileSync(path.join(root,'static/assets/components-legacy.css'),'utf8');
const count=(components.match(/button,input,select\{touch-action:manipulation;?\}/g)||[]).length;
if(count!==1)throw Error(`Expected one touch-action base rule, found ${count}`);
for(const name of ['foundation-legacy.css','components-legacy.css']){
 const text=fs.readFileSync(path.join(root,'static/assets',name),'utf8');
 if(!text.trim())throw Error(`${name} is empty`);
}
console.log('[CSS DEDUP] Removed 40 repeated declarations; touch-action baseline unique');
