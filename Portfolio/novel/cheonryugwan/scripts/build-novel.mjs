import fs from 'node:fs';import path from 'node:path';import {execFileSync} from 'node:child_process';
const root=path.resolve(process.argv[2]||'./.novel-source/CHEONRYUGWAN');
const target=path.resolve(process.argv[3]||'./static');
if(!fs.existsSync(root))throw Error(`Missing novel source: ${root}`);
const items=[];const assets=[];
// Clear previously synchronized archive images to prevent stale/private assets leaking.
fs.rmSync(path.join(target,'assets','archive'),{recursive:true,force:true});
function walk(dir,cb){if(!fs.existsSync(dir))return;for(const d of fs.readdirSync(dir,{withFileTypes:true})){if(d.name.startsWith('.')||d.isSymbolicLink())continue;const f=path.join(dir,d.name);if(d.isDirectory())walk(f,cb);else if(d.isFile())cb(f)}}
for(const section of ['01_NOVEL','02_CANON'])walk(path.join(root,section),file=>{
 const rel=path.relative(root,file).split(path.sep).join('/');
 if(!rel.endsWith('.md')||rel.split('/').some(segment=>segment.startsWith('_')||['REJECTED','INTERNAL','LEGACY','PREVIOUS_VERSIONS','SNAPSHOTS'].includes(segment)))return;
 if(rel.startsWith('01_NOVEL/')&&!/^01_NOVEL\/PART_(01_ACADEMY|02|03|04)\//.test(rel))return;
 if(['README.md','INDEX.md','CANON_INDEX.md'].includes(path.basename(file)))return;
 if(fs.statSync(file).size>750000)return;
 let body=fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'');
 let front={};if(body.startsWith('---\n')){const m=body.match(/^---\n([\s\S]*?)\n---\n/);if(m){for(const line of m[1].split('\n')){const x=line.match(/^([A-Za-z_]+):\s*(.+)$/);if(x)front[x[1]]=x[2].trim().replace(/^[\"']|[\"']$/g,'')}body=body.slice(m[0].length)}}
 const part=rel.startsWith('01_NOVEL/')?rel.split('/')[1]:'';
 const assetPrefix='assets/archive/';
 const resolveAsset=value=>{if(!value)return '';let v=value.trim();if(/^https:\/\//.test(v))return v;if(v.startsWith('03_ASSETS/'))return assetPrefix+v.slice('03_ASSETS/'.length);if(v.startsWith('assets/'))return v;if(/^chapter-[0-9]+\//.test(v))return assetPrefix+'NOVEL/'+part+'/'+v;if(/^([a-z0-9_-]+\.(png|webp|jpe?g|avif))$/i.test(v))return assetPrefix+'NOVEL/'+part+'/'+path.basename(file,'.md')+'/'+v;return ''};
 const title=body.match(/^#\s+(.+)$/m)?.[1]||path.basename(file,'.md').replace(/_/g,' ');
 items.push({path:rel,title,kind:rel.startsWith('01_NOVEL/')?'novel':'canon',body,part,id:rel,cover:resolveAsset(front.cover||front.thumbnail||'')});
});
const assetRoot=path.join(root,'03_ASSETS');walk(assetRoot,file=>{
 if(!/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(file)||fs.statSync(file).size>12000000)return;
 if(path.relative(assetRoot,file).split(path.sep).some(segment=>segment.startsWith('_')||['REJECTED','INTERNAL','LEGACY','PREVIOUS_VERSIONS','SNAPSHOTS'].includes(segment)))return;
 const rel=path.relative(assetRoot,file).split(path.sep).join('/');const dst=path.join(target,'assets','archive',rel);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(file,dst);
 assets.push({path:'03_ASSETS/'+rel,url:'assets/archive/'+rel,bytes:fs.statSync(file).size});
});
let revision='unknown';try{revision=execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim()}catch{}
// Validate the manually approved gallery manifest against assets actually published.
// Do not auto-assign character identity from ambiguous image filenames.
const mappingFile=path.join(target,'character-images.json');
if(fs.existsSync(mappingFile)){
 const mapping=JSON.parse(fs.readFileSync(mappingFile,'utf8'));
 const available=new Set(assets.map(a=>a.url));
 // Bundled public images are also permitted; these are shipped with the site.
 const bundled=path.resolve(import.meta.dirname,'..','static');
 const valid=u=>typeof u==='string'&&/^assets\/[a-zA-Z0-9_./-]+\.(webp|png|jpg|jpeg|avif)$/i.test(u)&&!u.includes('..')&&(available.has(u)||fs.existsSync(path.join(bundled,u)));
 const characters=new Set(items.filter(i=>i.path.startsWith('02_CANON/CHARACTERS/')&&!/\/(RELATIONSHIPS|COSTUMES)\//i.test(i.path)).map(i=>i.path));
 const cleaned={schemaVersion:1,description:'공개 문서와 실제 배포 이미지로 검증된 매핑',portraits:{},galleries:{}};
 for(const [key,url] of Object.entries(mapping.portraits||{}))if(characters.has(key)&&valid(url))cleaned.portraits[key]=url;else console.warn('[NOVEL] 미검증 대표 이미지 제외:',key,url);
 for(const [key,entries] of Object.entries(mapping.galleries||{})){
  if(!characters.has(key)||!Array.isArray(entries))continue;
  const accepted=entries.filter(e=>e&&valid(e.url)&&['stand','battle','outfit','expression','event'].includes(e.type));
  if(accepted.length)cleaned.galleries[key]=accepted;
  if(accepted.length!==entries.length)console.warn('[NOVEL] 미검증 갤러리 이미지 제외:',key,entries.length-accepted.length);
 }
 fs.writeFileSync(mappingFile,JSON.stringify(cleaned,null,2));
 console.log(`[NOVEL] 공식 이미지 매핑 검증: 대표 ${Object.keys(cleaned.portraits).length}개, 갤러리 ${Object.values(cleaned.galleries).reduce((n,a)=>n+a.length,0)}개`);
}
fs.mkdirSync(target,{recursive:true});fs.writeFileSync(path.join(target,'content.json'),JSON.stringify({schemaVersion:1,source:'min-ser/NOVEL',sourcePath:'CHEONRYUGWAN',branch:'master',revision,count:items.length,assets,items}));
console.log(`Generated ${items.length} public Markdown documents, ${assets.length} assets`);
