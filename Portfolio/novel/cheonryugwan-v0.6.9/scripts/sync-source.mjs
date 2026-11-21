import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const source=path.join(root,'.novel-source');
const target=path.join(root,'static');
// Never leave a stale successful export behind after a failed sync.
fs.rmSync(path.join(root,'dist'),{recursive:true,force:true});
const override=process.env.NOVEL_SOURCE_DIR;
const repo=process.env.NOVEL_REPOSITORY||'https://github.com/min-ser/NOVEL.git';
const branch=process.env.NOVEL_BRANCH||'master';
const run=(args)=>execFileSync('git',args,{cwd:root,stdio:'inherit',timeout:120000});
let checkout;
try {
  if(override){
    const candidate=path.resolve(override);
    checkout=fs.existsSync(path.join(candidate,'CHEONRYUGWAN'))?path.join(candidate,'CHEONRYUGWAN'):candidate;
    console.log(`[NOVEL] 사전 체크아웃 사용: ${checkout}`);
  } else {
    checkout=path.join(source,'CHEONRYUGWAN');
    if(!fs.existsSync(path.join(source,'.git'))){
      fs.rmSync(source,{recursive:true,force:true});
      fs.mkdirSync(path.dirname(source),{recursive:true});
      run(['clone','--depth','1','--single-branch','--branch',branch,repo,source]);
    } else {
      run(['-C',source,'fetch','--depth','1','origin',branch]);
      run(['-C',source,'reset','--hard','FETCH_HEAD']);
    }
  }
  if(!fs.existsSync(path.join(checkout,'01_NOVEL')))throw Error(`01_NOVEL 폴더를 찾을 수 없습니다: ${checkout}`);
  execFileSync(process.execPath,[path.join(root,'scripts/build-novel.mjs'),checkout,target],{cwd:root,stdio:'inherit',timeout:120000});
  const manifest=JSON.parse(fs.readFileSync(path.join(target,'content.json'),'utf8'));
  if(!manifest.items?.some(x=>x.kind==='novel'))throw Error('공개할 실제 소설 회차가 없습니다. 원고 경로를 확인하세요.');
  if(manifest.syncStatus==='failed')throw Error('원고 동기화 실패 상태입니다.');
  console.log(`[NOVEL] 실제 원고 ${manifest.count}개, revision=${manifest.revision} 동기화 완료`);
} catch(e) {
  fs.mkdirSync(target,{recursive:true});
  // Preserve failure information but never produce a seemingly valid production build.
  fs.writeFileSync(path.join(target,'content.json'),JSON.stringify({schemaVersion:1,source:'min-ser/NOVEL',branch,revision:'SYNC_FAILED',count:0,assets:[],items:[],syncStatus:'failed',message:e.message},null,2));
  console.error(`[NOVEL] 동기화 실패: ${e.message}`);
  process.exitCode=1;
}
