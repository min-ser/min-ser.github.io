import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');const dist=path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
for(const file of ['index.html','app.js'])fs.copyFileSync(path.join(root,file),path.join(dist,file));
fs.cpSync(path.join(root,'static'),dist,{recursive:true,force:true});
console.log('정적 사이트 생성 완료: dist/');
