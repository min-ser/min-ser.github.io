import {storage} from "../../assets/js/core/storage.js";
import {downloadText} from "../../assets/js/core/utils.js";
import {AssetRegistry} from "../../assets/js/core/asset-registry.js";
import {toast} from "../../assets/js/components/toast.js";

const $=s=>document.querySelector(s);
let scenes=[],cur=-1;
const keys=["id","speaker","text","background","character","expression","cg","effect"];
const F=Object.fromEntries(keys.map(k=>[k,$("#"+k)]));
const empty=()=>({id:"scene-"+String(scenes.length+1).padStart(3,"0"),speaker:"",text:"",background:"",character:"",expression:"",cg:"",effect:""});
const norm=d=>Array.isArray(d)?d:(d.scenes||d.script||[]);
function save(){storage.set("cheonryugwan-editor-draft",scenes);$("#dirty").textContent="MODIFIED"}
function list(){const e=$("#list");e.innerHTML="";scenes.forEach((s,i)=>{const d=document.createElement("div");d.className="scene"+(i===cur?" active":"");d.innerHTML=`<div class="sid">${s.id||"scene-"+i}</div><div class="stext">${s.speaker?"["+s.speaker+"] ":""}${s.text||"(empty)"}</div>`;d.onclick=()=>select(i);e.append(d)})}
function select(i){cur=i;const s=scenes[i];if(!s)return;keys.forEach(k=>F[k].value=s[k]||"");list();preview()}
function sync(){if(cur<0)return;keys.forEach(k=>scenes[cur][k]=F[k].value);save();list();preview()}
function preview(){const s=scenes[cur]||{};$("#pspeaker").textContent=s.speaker||"NARRATION";$("#ptext").textContent=s.text||"(empty)";$("#no").textContent=cur+1;$("#stage").style.backgroundImage=s.background?`url("${s.background}")`:"none";$("#json").value=JSON.stringify(s,null,2)}
keys.forEach(k=>F[k].addEventListener("input",sync));
$("#addBtn").onclick=()=>{scenes.splice(cur+1,0,empty());select(cur+1);save()};
$("#dup").onclick=()=>{if(cur<0)return;const n=structuredClone(scenes[cur]);n.id=(n.id||"scene")+"-copy";scenes.splice(cur+1,0,n);select(cur+1);save()};
$("#del").onclick=()=>{if(cur<0)return;scenes.splice(cur,1);cur=Math.min(cur,scenes.length-1);list();if(cur>=0)select(cur);save()};
$("#up").onclick=()=>{if(cur<=0)return;[scenes[cur-1],scenes[cur]]=[scenes[cur],scenes[cur-1]];select(--cur);save()};
$("#down").onclick=()=>{if(cur<0||cur>=scenes.length-1)return;[scenes[cur+1],scenes[cur]]=[scenes[cur],scenes[cur+1]];select(++cur);save()};
$("#newBtn").onclick=()=>{if(confirm("새 시나리오를 시작합니까?")){scenes=[empty()];select(0);save();toast("새 시나리오를 생성했습니다.")}};
$("#file").onchange=async e=>{try{scenes=norm(JSON.parse(await e.target.files[0].text()));if(!scenes.length)throw Error("scene array not found");select(0);save();toast("JSON을 불러왔습니다.")}catch(x){toast("JSON Import 실패: "+x.message,"error")}};
$("#exportBtn").onclick=()=>{downloadText("cheonryugwan-scenario.json",JSON.stringify({version:"0.10.3",scenes},null,2),"application/json");$("#dirty").textContent="EXPORTED";toast("JSON을 내보냈습니다.")};
$("#loadAssets").onclick=async()=>{const box=$("#assets");box.innerHTML='<div class="ui-loading">loading assets...</div>';try{const all=await AssetRegistry.backgrounds();box.innerHTML="";all.forEach(x=>{if(!x.assetUrl)return;const d=document.createElement("div");d.className="asset";d.innerHTML=`<img loading="lazy" src="${x.assetUrl}"><span>P${x.part} · ${x.title||x.name||x.id}</span>`;d.onclick=()=>{F.background.value=x.assetUrl;sync()};box.append(d)});toast(`배경 ${all.length}개를 불러왔습니다.`)}catch(e){box.innerHTML='<div class="ui-error">asset load failed</div>';toast(e.message,"error")}};
scenes=storage.get("cheonryugwan-editor-draft",[]);
if(!scenes.length)scenes=[empty()];select(0);
addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="s"){e.preventDefault();storage.set("cheonryugwan-editor-draft",scenes);$("#dirty").textContent="LOCAL SAVED";toast("로컬 Draft 저장 완료")}});
