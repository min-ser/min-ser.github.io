import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const manifestPath=path.join(root,'static/content.json');
if(!fs.existsSync(manifestPath))throw Error('content.json 없음: npm run build 전에 원고 동기화 필요');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
if(manifest.syncStatus==='failed'||manifest.revision==='SYNC_FAILED'||manifest.source!=='min-ser/NOVEL'||!Array.isArray(manifest.items)||!manifest.items.some(x=>x.kind==='novel')){
  throw Error('원고 동기화가 완료되지 않았습니다. 실패한 콘텐츠로 배포하지 않습니다.');
}
const dist=path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
for(const file of ['index.html','app.js'])fs.copyFileSync(path.join(root,file),path.join(dist,file));
fs.cpSync(path.join(root,'static'),dist,{recursive:true,force:true});
console.log(`정적 사이트 생성 완료: dist/ (${manifest.items.length}개 문서)`);
