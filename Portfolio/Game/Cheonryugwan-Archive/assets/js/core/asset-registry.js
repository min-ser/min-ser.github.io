
const BASE=new URL("../../../",import.meta.url);
const json=async p=>{const r=await fetch(new URL(p,BASE));if(!r.ok)throw Error(`${p}: ${r.status}`);return r.json()};
const first=async files=>{for(const f of files){try{return await json(f)}catch{}}return null};
const flatten=x=>Array.isArray(x)?x:(x?.items||x?.backgrounds||x?.characters||x?.assets||[]);
const absolute=v=>!v?"":/^https?:/i.test(v)?v:new URL(v,BASE).href;
export const AssetRegistry={
 async backgrounds(){
  const files=["data/backgrounds-part-1.json","data/part-2-backgrounds.json","data/part-3-backgrounds.json","data/part-4-backgrounds.json"],all=[];
  for(let i=0;i<files.length;i++){const j=await json(files[i]);for(const x of flatten(j))all.push({...x,part:i+1,assetUrl:absolute(x.remoteUrl||x.web||x.image||x.file)})}
  return all
 },
 async characters(){
  const j=await first(["data/characters.json","data/character-manifest.json","data/characters-manifest.json"]);
  return flatten(j).map(x=>({...x,assetUrl:absolute(x.remoteUrl||x.web||x.image||x.file)}))
 },
 async cg(){
  const j=await first(["data/cg.json","data/cg-manifest.json","data/event-cg.json"]);
  return flatten(j).map(x=>({...x,assetUrl:absolute(x.remoteUrl||x.web||x.image||x.file)}))
 },
 async audio(){
  const j=await first(["data/audio.json","data/audio-manifest.json","data/sound-manifest.json"]);
  return flatten(j).map(x=>({...x,assetUrl:absolute(x.remoteUrl||x.web||x.src||x.file)}))
 }
};
