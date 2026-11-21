import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const required=['app.js','index.html','scripts/build-novel.mjs','scripts/dev.mjs','scripts/build.mjs','scripts/sync-source.mjs','scripts/verify-dist.mjs','scripts/build-reference-preview.mjs','scripts/test-integration.mjs'];
const missing=required.filter(p=>!fs.statSync(path.join(root,p),{throwIfNoEntry:false})?.isFile());
for(const [name,cmd] of Object.entries(pkg.scripts||{})){
 for(const m of cmd.matchAll(/node(?:\s+--check)?\s+(scripts\/[\w.-]+\.mjs|app\.js)/g)){
  if(!fs.statSync(path.join(root,m[1]),{throwIfNoEntry:false})?.isFile())missing.push(`${m[1]} (npm script: ${name})`);
 }
}
if(missing.length){console.error('[PREFLIGHT] Missing project files:\n'+[...new Set(missing)].map(s=>'  - '+s).join('\n'));console.error('[PREFLIGHT] Deploy the ENTIRE Portfolio/novel/cheonryugwan directory, including scripts/.');process.exit(1)}
console.log(`[PREFLIGHT] ${pkg.name}@${pkg.version}: required files and npm script references OK`);
