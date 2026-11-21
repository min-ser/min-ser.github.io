import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'crg-integration-'));
try {
 const source=path.join(tmp,'CHEONRYUGWAN');const output=path.join(tmp,'output');
 fs.mkdirSync(path.join(source,'01_NOVEL','PART_01_ACADEMY'),{recursive:true});
 fs.mkdirSync(path.join(source,'01_NOVEL','_DRAFTS'),{recursive:true});
 fs.mkdirSync(path.join(source,'03_ASSETS','NOVEL','PART_01_ACADEMY','chapter-01'),{recursive:true});
 for(let i=1;i<=14;i++)fs.writeFileSync(path.join(source,'01_NOVEL','PART_01_ACADEMY',`chapter-${String(i).padStart(2,'0')}.md`),`# 《천류관》 제1부 — 돌아올 곳\n\n## 제${i}화 · 검증용 회차 ${i}\n\n동기화 테스트`);
 fs.writeFileSync(path.join(source,'01_NOVEL','_DRAFTS','secret.md'),'# SHOULD NOT PUBLISH');
 fs.writeFileSync(path.join(source,'03_ASSETS','NOVEL','PART_01_ACADEMY','chapter-01','cover.webp'),'test image');
 execFileSync(process.execPath,[path.join(root,'scripts/build-novel.mjs'),source,output],{stdio:'inherit'});
 const data=JSON.parse(fs.readFileSync(path.join(output,'content.json'),'utf8'));
 if(data.items.length!==14||data.audit?.academyChapters!==14||data.items.some(x=>x.path.includes('_DRAFTS')))throw Error('Unexpected published items');
 if(!data.items.find(x=>x.path.endsWith('chapter-14.md'))||!data.items.find(x=>x.path.endsWith('chapter-04.md')).title.includes('제4화'))throw Error('Missing chapter or chapter-specific title');
 if(!fs.existsSync(path.join(output,'assets','archive','NOVEL','PART_01_ACADEMY','chapter-01','cover.webp')))throw Error('Missing copied image');
 console.log('[INTEGRATION] Fixture passed; no test content written into project static/');
} finally {fs.rmSync(tmp,{recursive:true,force:true})}
