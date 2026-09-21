import {storage} from "../../assets/js/core/storage.js";
import {downloadText,escapeHtml} from "../../assets/js/core/utils.js";
import {AssetRegistry} from "../../assets/js/core/asset-registry.js";
import {History} from "../../assets/js/core/history.js";
import {toast} from "../../assets/js/components/toast.js";

const $=s=>document.querySelector(s), history=new History(100);
const keys=["id","type","speaker","text","background","character","expression","position","camera","cg","bgm","sfx","ambient","effect","visible","end","choices"];
const F=Object.fromEntries(keys.map(k=>[k,$("#"+k)]));
let scenes=[],cur=-1,auto=null,assets=[],bottom="validation";
const empty=()=>({id:`scene-${String(scenes.length+1).padStart(3,"0")}`,type:"narration",speaker:"",text:"",background:"",character:"",expression:"",position:"",camera:"",cg:"",bgm:"",sfx:"",ambient:"",effect:"",visible:"",end:"",choices:""});
const normalize=d=>Array.isArray(d)?d:(d.scenes||d.script||[]);
const snapshot=()=>structuredClone(scenes);
function pushHistory(){history.push(snapshot())}
function save(){storage.set("cheonryugwan-editor-draft",scenes);$("#dirty").textContent="MODIFIED"}
function normalizeScene(s){const n={...empty(),...s};if(Array.isArray(s.choices))n.choices=JSON.stringify(s.choices);return n}
function exportScene(s){const o={...s};for(const k of Object.keys(o))if(o[k]==="")delete o[k];if(o.visible==="true"||o.visible==="false")o.visible=o.visible==="true";if(o.end==="true")o.end=true;if(o.choices){try{o.choices=JSON.parse(o.choices)}catch{}}return o}
function renderList(){
 const q=$("#search").value.toLowerCase(),el=$("#list");el.innerHTML="";
 scenes.forEach((s,i)=>{const hay=`${s.id} ${s.speaker} ${s.text}`.toLowerCase();if(q&&!hay.includes(q))return;
 const d=document.createElement("div");d.className="scene"+(i===cur?" active":"");d.draggable=true;d.dataset.i=i;
 d.innerHTML=`<div class="sid">${escapeHtml(s.id)}</div><div class="st">${escapeHtml(s.speaker?`[${s.speaker}] `:"")}${escapeHtml(s.text||"(empty)")}</div>`;
 d.onclick=()=>select(i);d.ondragstart=()=>d.classList.add("dragging");d.ondragend=()=>d.classList.remove("dragging");
 d.ondragover=e=>e.preventDefault();d.ondrop=e=>{e.preventDefault();const from=+document.querySelector(".scene.dragging")?.dataset.i;if(Number.isNaN(from)||from===i)return;pushHistory();const [m]=scenes.splice(from,1);scenes.splice(i,0,m);cur=i;save();renderList();preview()};
 el.append(d)})
}
function select(i){cur=i;const s=scenes[i];if(!s)return;keys.forEach(k=>F[k].value=s[k]??"");renderList();preview();renderBottom()}
function sync(){if(cur<0)return;pushHistory();keys.forEach(k=>scenes[cur][k]=F[k].value);save();renderList();preview();renderBottom()}
function preview(){const s=scenes[cur]||{};$("#pspeaker").textContent=s.speaker||"NARRATION";$("#ptext").textContent=s.text||"(empty)";$("#counter").textContent=`${cur+1} / ${scenes.length}`;$("#stage").style.backgroundImage=s.background?`url("${s.background}")`:"none"}
function issues(){
 const out=[],ids=new Set();
 scenes.forEach((s,i)=>{if(!s.id)out.push({level:"error",i,msg:"Scene ID 없음"});else if(ids.has(s.id))out.push({level:"error",i,msg:`중복 ID: ${s.id}`});else ids.add(s.id);
 if(!s.text&&s.type!=="transition"&&s.type!=="cg")out.push({level:"warn",i,msg:"대사/나레이션 비어 있음"});
 if(s.type==="choice"&&s.choices){try{const c=JSON.parse(s.choices);if(!Array.isArray(c))throw 0}catch{out.push({level:"error",i,msg:"Choices JSON 형식 오류"})}}
 });
 return out
}
function renderBottom(){
 const box=$("#bottomContent");
 if(bottom==="json"){box.innerHTML=`<pre class="console">${escapeHtml(JSON.stringify(exportScene(scenes[cur]||{}),null,2))}</pre>`;return}
 if(bottom==="log"){box.innerHTML=`<div class="console">[SYSTEM] Scenario Editor v0.10.6\n[SCENES] ${scenes.length}\n[CURRENT] ${scenes[cur]?.id||"-"}\n[LOCAL DRAFT] enabled\n[HISTORY] Undo ${history.undoStack.length} / Redo ${history.redoStack.length}</div>`;return}
 const a=issues();box.innerHTML=a.length?a.map(x=>`<div class="issue ${x.level}" data-i="${x.i}">[${x.level.toUpperCase()}] Scene ${x.i+1} · ${escapeHtml(x.msg)}</div>`).join(""):`<div class="ui-empty">Validation PASS · 현재 발견된 오류가 없습니다.</div>`;
 box.querySelectorAll(".issue").forEach(x=>x.onclick=()=>select(+x.dataset.i))
}
async function loadAssets(type){
 const grid=$("#assetGrid");grid.innerHTML='<div class="ui-loading">loading...</div>';
 try{assets=await AssetRegistry[type]();renderAssets();toast(`${type}: ${assets.length}개 로드`)}catch(e){assets=[];grid.innerHTML=`<div class="ui-error">${escapeHtml(type)} manifest 없음 또는 로드 실패</div>`}
}
function renderAssets(){
 const q=$("#assetSearch").value.toLowerCase(),grid=$("#assetGrid");grid.innerHTML="";
 assets.filter(x=>`${x.title||""} ${x.name||""} ${x.id||""}`.toLowerCase().includes(q)).forEach(x=>{const d=document.createElement("div");d.className="asset";
 d.innerHTML=x.assetUrl&&/\.(png|jpg|jpeg|webp)(\?|$)/i.test(x.assetUrl)?`<img loading="lazy" src="${x.assetUrl}"><span>${escapeHtml(x.title||x.name||x.id)}</span>`:`<div style="padding:12px 2px">${escapeHtml(x.title||x.name||x.id||"asset")}</div>`;
 d.onclick=()=>{const active=document.querySelector(".assetTab.active")?.dataset.type;if(active==="backgrounds")F.background.value=x.assetUrl||x.id||"";else if(active==="characters")F.character.value=x.id||x.name||"";else if(active==="cg")F.cg.value=x.assetUrl||x.id||"";else if(active==="audio"){F.sfx.value=x.assetUrl||x.id||"";if(x.assetUrl){const a=new Audio(x.assetUrl);a.play().catch(()=>{})}}sync()};grid.append(d)})
 if(!grid.children.length)grid.innerHTML='<div class="ui-empty">검색 결과 없음</div>'
}
keys.forEach(k=>F[k].addEventListener("change",sync));F.text.addEventListener("input",sync);
$("#search").oninput=renderList;$("#assetSearch").oninput=renderAssets;
$("#add").onclick=()=>{pushHistory();scenes.splice(cur+1,0,empty());select(cur+1);save()};
$("#dup").onclick=()=>{if(cur<0)return;pushHistory();const n=structuredClone(scenes[cur]);n.id=(n.id||"scene")+"-copy";scenes.splice(cur+1,0,n);select(cur+1);save()};
$("#del").onclick=()=>{if(cur<0)return;pushHistory();scenes.splice(cur,1);cur=Math.min(cur,scenes.length-1);if(!scenes.length)scenes=[empty()];select(Math.max(cur,0));save()};
$("#prev").onclick=()=>select(Math.max(0,cur-1));$("#next").onclick=()=>select(Math.min(scenes.length-1,cur+1));
$("#play").onclick=()=>{if(auto){clearInterval(auto);auto=null;$("#play").textContent="AUTO";return}$("#play").textContent="STOP";auto=setInterval(()=>{if(cur>=scenes.length-1){clearInterval(auto);auto=null;$("#play").textContent="AUTO"}else select(cur+1)},2500)};
$("#runtime").onclick=()=>window.open("../../game/index.html","_blank");
$("#new").onclick=()=>{if(confirm("현재 편집 내용을 초기화합니까?")){pushHistory();scenes=[empty()];select(0);save()}};
$("#import").onchange=async e=>{try{pushHistory();scenes=normalize(JSON.parse(await e.target.files[0].text())).map(normalizeScene);if(!scenes.length)throw Error("scene array not found");select(0);save();toast("JSON Import 완료")}catch(e){toast(e.message,"error")}};
$("#export").onclick=()=>{const errs=issues().filter(x=>x.level==="error");if(errs.length&&!confirm(`오류 ${errs.length}건이 있습니다. 그래도 Export합니까?`))return;downloadText("cheonryugwan-scenario.json",JSON.stringify({version:"0.10.6",scenes:scenes.map(exportScene)},null,2),"application/json");$("#dirty").textContent="EXPORTED"};
$("#validate").onclick=()=>{bottom="validation";renderBottom();const e=issues();toast(e.length?`Validation: ${e.length}건 확인`:"Validation PASS",e.some(x=>x.level==="error")?"error":"info")};
$("#undo").onclick=()=>{const s=history.undo(snapshot());if(s){scenes=s;cur=Math.min(cur,scenes.length-1);select(Math.max(cur,0));save()}};
$("#redo").onclick=()=>{const s=history.redo(snapshot());if(s){scenes=s;cur=Math.min(cur,scenes.length-1);select(Math.max(cur,0));save()}};
document.querySelectorAll(".assetTab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".assetTab").forEach(x=>x.classList.remove("active"));b.classList.add("active");loadAssets(b.dataset.type)});
document.querySelectorAll("[data-bottom]").forEach(b=>b.onclick=()=>{bottom=b.dataset.bottom;renderBottom()});
addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();storage.set("cheonryugwan-editor-draft",scenes);$("#dirty").textContent="LOCAL SAVED";toast("Draft 저장")};if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"){e.preventDefault();$("#undo").click()};if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"){e.preventDefault();$("#redo").click()}});
scenes=(storage.get("cheonryugwan-editor-draft",[])||[]).map(normalizeScene);if(!scenes.length)scenes=[empty()];select(0);renderBottom();
