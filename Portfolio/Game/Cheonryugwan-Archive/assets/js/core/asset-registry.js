
const manifests=["data/backgrounds-part-1.json","data/part-2-backgrounds.json","data/part-3-backgrounds.json","data/part-4-backgrounds.json"];
function base(){const u=new URL(import.meta.url);return u.href.replace(/assets\/js\/core\/asset-registry\.js.*$/,"")}
export const AssetRegistry={
 async backgrounds(){
   const all=[];
   for(let i=0;i<manifests.length;i++){
     const url=new URL(manifests[i],base()).href;
     const j=await fetch(url).then(r=>{if(!r.ok)throw Error(url);return r.json()});
     for(const x of (j.backgrounds||j.items||[])){
       let asset=x.remoteUrl||x.web||x.image||"";
       if(asset && !/^https?:/i.test(asset))asset=new URL(asset,base()).href;
       all.push({...x,part:i+1,assetUrl:asset});
     }
   }
   return all;
 },
 async characters(){
   const candidates=["data/characters.json","data/character-manifest.json","data/characters-manifest.json"];
   for(const f of candidates){try{return await fetch(new URL(f,base())).then(r=>r.ok?r.json():Promise.reject())}catch{}}
   return [];
 }
};
