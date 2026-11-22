import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const marker of ['v0.9.18–v0.9.22 consolidated visual and responsive system','.immersive-reader{height:calc(100dvh - 50px);min-height:0','data-go="novel"','id="primaryNav"']){
 if(!html.includes(marker))throw Error(`Missing responsive requirement: ${marker}`);
}
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
for(const name of ['build-novel.mjs','build-reference-preview.mjs','preflight.mjs','verify-dist.mjs']){
 if(!fs.existsSync(path.join(root,'scripts',name)))throw Error(`Missing required script: ${name}`);
}
console.log('[VIEWPORT] Static responsive and script checks passed (not a browser visual test).');
