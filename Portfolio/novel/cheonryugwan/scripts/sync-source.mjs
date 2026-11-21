import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const source=path.join(root,'.novel-source');
const checkout=path.join(source,'CHEONRYUGWAN');
const target=path.join(root,'static');
const run=(args)=>execFileSync('git',args,{cwd:root,stdio:'inherit',timeout:90000});
try {
  if(!fs.existsSync(checkout)){
    fs.mkdirSync(source,{recursive:true});
    run(['clone','--depth','1','--branch','master','https://github.com/min-ser/NOVEL.git',source]);
  } else if(fs.existsSync(path.join(source,'.git'))) {
    run(['-C',source,'pull','--ff-only','origin','master']);
  }
  if(!fs.existsSync(checkout))throw Error('CHEONRYUGWAN 디렉터리를 찾지 못했습니다.');
  execFileSync(process.execPath,[path.join(root,'scripts/build-novel.mjs'),checkout,target],{cwd:root,stdio:'inherit',timeout:90000});
  const manifest=JSON.parse(fs.readFileSync(path.join(target,'content.json'),'utf8'));
  if(manifest.count===0)throw Error('원고가 0개입니다. 원본 저장소 구조를 확인하세요.');
  console.log(`[NOVEL] 실제 원고 ${manifest.count}개 동기화 완료`);
} catch(e) {
  // Never serve stale or fabricated content after a failed sync.
  fs.writeFileSync(path.join(target,'content.json'),JSON.stringify({schemaVersion:1,source:'min-ser/NOVEL',branch:'master',revision:'SYNC_FAILED',count:0,assets:[],items:[],syncStatus:'failed',message:String(e.message)},null,2));
  console.error('[NOVEL] 실제 원고 동기화 실패. 샘플 원고는 표시하지 않습니다.');
  process.exitCode=1;
}
