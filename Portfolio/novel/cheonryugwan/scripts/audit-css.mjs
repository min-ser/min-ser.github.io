import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const files=['foundation-legacy.css','components-legacy.css','layout-canonical.css','home-v0928.css','design-components.css','archive-unified.css'];
const report=[];
for(const file of files){
  const content=fs.readFileSync(path.join(root,'static/assets',file),'utf8');
  const rules=[...content.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const selectors=new Map();
  for(const [,selector,body] of rules){
    const key=selector.trim().replace(/\s+/g,' ');
    if(!key || key.startsWith('@')) continue;
    selectors.set(key,(selectors.get(key)||0)+1);
  }
  const repeated=[...selectors].filter(([,count])=>count>1).sort((a,b)=>b[1]-a[1]);
  report.push({file,bytes:Buffer.byteLength(content),important:(content.match(/!important/g)||[]).length,selectorRepetitions:repeated.length,mostRepeated:repeated.slice(0,8)});
}
const dir=path.join(root,'docs');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'CSS_AUDIT_v0.9.32.json'),JSON.stringify(report,null,2)+'\n');
for(const r of report)console.log(`[CSS AUDIT] ${r.file}: ${r.bytes} bytes, ${r.important} !important, ${r.selectorRepetitions} repeated selectors`);
if(!fs.readFileSync(path.join(root,'index.html'),'utf8').includes('design-components.css'))throw Error('Common components CSS not linked');
