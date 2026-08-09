
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const base="../../../";
let characters={},backgrounds={},audio={bgm:{},ambient:{},sfx:{}},cgMap={};
let doc={id:"new-chapter",title:"새 챕터",subtitle:"",scenes:[],engineVersion:"0.9.9.5",playMode:"linear",choices:false};
let issues=[],dragIndex=null;

const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
async function init(){
 [characters,backgrounds,audio,cgMap]=await Promise.all([
  fetch(base+"game/data/system/characters.json").then(r=>r.json()),
  fetch(base+"game/data/system/backgrounds.json").then(r=>r.json()),
  fetch(base+"game/data/system/audio.json").then(r=>r.json()),
  fetch(base+"game/data/system/scene-cg.json").then(r=>r.json()).catch(()=>({}))
 ]);
 const fromConverter=localStorage.getItem("scene-editor-input");
 if(fromConverter){try{doc=JSON.parse(fromConverter);loadDocument(doc)}catch{}}
 else newDocument();
}
function newDocument(){
 doc={id:"volume-01-part-01-chapter-01",title:"새 챕터",subtitle:"",status:"generated",scenes:[],engineVersion:"0.9.9.5",playMode:"linear",choices:false};
 addScene(false);loadDocument(doc)
}
function loadDocument(data){
 doc=structuredClone(data);if(!Array.isArray(doc.scenes))doc.scenes=[];
 $("#chapter-id").value=doc.id||"";$("#chapter-title").value=doc.title||"";$("#chapter-subtitle").value=doc.subtitle||"";$("#engine-version").value=doc.engineVersion||"0.9.9.5";
 renderScenes();validateAll(false);updateStats();$("#scene-state").textContent=`로드 완료 · ${doc.scenes.length} Scene`
}
function syncMeta(){
 doc.id=$("#chapter-id").value.trim();doc.title=$("#chapter-title").value;doc.subtitle=$("#chapter-subtitle").value;doc.engineVersion=$("#engine-version").value||"0.9.9.5";
 doc.playMode=doc.playMode||"linear";doc.choices=false
}
function emptyScene(){
 const prefix=guessPrefix(),n=doc.scenes.length+1;
 return{id:`${prefix}-s${String(n).padStart(3,"0")}`,speaker:"",text:"",background:Object.keys(backgrounds)[0]||"",}
}
function guessPrefix(){
 const id=$("#chapter-id").value||doc.id||"chapter-01";const m=id.match(/chapter-(\d+)/);return`c${String(m?+m[1]:1).padStart(2,"0")}`
}
function addScene(render=true,index=doc.scenes.length){
 doc.scenes.splice(index,0,emptyScene());if(render){renumberIds(false);renderScenes();updateStats()}
}
function option(value,label,selected){return`<option value="${esc(value)}"${value===selected?" selected":""}>${esc(label)}</option>`}
function fillSelect(select,entries,selected,blank="없음"){
 select.innerHTML=option("",blank,selected)+entries.map(([v,l])=>option(v,l,selected)).join("")
}
function sceneIssues(index){return issues.filter(x=>x.index===index)}
function renderScenes(){
 const box=$("#scene-list"),q=$("#scene-search").value.trim().toLowerCase(),filter=$("#scene-filter").value;box.innerHTML="";
 doc.scenes.forEach((scene,index)=>{
  const si=sceneIssues(index),hasError=si.some(x=>x.level==="error");
  const type=scene.speaker?"dialogue":"narration",hasCg=Boolean(scene.cg||scene.cgId||cgForScene(scene.id));
  if(q&&!`${scene.id} ${scene.speaker||""} ${scene.text||""}`.toLowerCase().includes(q))return;
  if(filter==="dialogue"&&type!=="dialogue")return;if(filter==="narration"&&type!=="narration")return;if(filter==="cg"&&!hasCg)return;if(filter==="error"&&!hasError)return;
  const card=$("#scene-card-template").content.firstElementChild.cloneNode(true);card.dataset.index=index;if(hasError)card.classList.add("has-error");
  card.querySelector(".scene-id").value=scene.id||"";card.querySelector(".scene-type-badge").textContent=type==="dialogue"?"대사":"나레이션";
  card.querySelector(".scene-speaker").value=scene.speaker||"";card.querySelector(".scene-text").value=scene.text||"";
  const charSel=card.querySelector(".scene-character"),currentChar=scene.character?.id||"";
  fillSelect(charSel,Object.entries(characters).map(([id,c])=>[id,`${c.name} (${id})`]),currentChar,"스탠딩 없음");
  fillExpressions(card,index,currentChar,scene.character?.expression||"");
  card.querySelector(".scene-position").value=scene.character?.position||"center";
  fillSelect(card.querySelector(".scene-background"),Object.keys(backgrounds).map(id=>[id,id]),scene.background||"","배경 없음");
  fillSelect(card.querySelector(".scene-bgm"),Object.keys(audio.bgm||{}).map(id=>[id,id]),scene.bgm||"","없음");
  fillSelect(card.querySelector(".scene-ambient"),Object.keys(audio.ambient||{}).map(id=>[id,id]),scene.ambient||"","없음");
  fillSelect(card.querySelector(".scene-sfx"),Object.keys(audio.sfx||{}).map(id=>[id,id]),scene.sfx||"","없음");
  card.querySelector(".scene-effect").value=scene.effect||"";card.querySelector(".scene-camera").value=scene.camera||"";
  const cgSel=card.querySelector(".scene-cg");fillSelect(cgSel,cgOptions(),scene.cg||scene.cgId||cgForScene(scene.id)||"","CG 없음");
  card.querySelector(".scene-end").checked=Boolean(scene.end);
  const v=card.querySelector(".scene-validation");v.innerHTML=si.map(x=>`<span class="validation-chip ${x.level}">${esc(x.message)}</span>`).join("");
  bindCard(card,index);box.appendChild(card)
 })
}
function fillExpressions(card,index,charId,selected){
 const sel=card.querySelector(".scene-expression");if(!charId||!characters[charId]){sel.innerHTML=option("","없음","");sel.disabled=true;return}
 const c=characters[charId],keys=Object.keys(c.assets||{});sel.disabled=false;fillSelect(sel,keys.map(k=>[k,k]),selected||c.defaultExpression||"default","없음")
}
function cgOptions(){
 const set=new Set();if(Array.isArray(cgMap)){cgMap.forEach(x=>set.add(x.id||x.cg||x.path))}
 else if(cgMap&&typeof cgMap==="object"){Object.entries(cgMap).forEach(([k,v])=>{if(typeof v==="string")set.add(k);else if(v?.id)set.add(v.id);else set.add(k)})}
 return [...set].filter(Boolean).map(x=>[x,x])
}
function cgForScene(id){
 if(!cgMap||!id)return"";if(typeof cgMap[id]==="string")return id;if(cgMap[id]?.id)return cgMap[id].id;
 if(Array.isArray(cgMap)){const x=cgMap.find(v=>v.scene===id||v.sceneId===id);return x?.id||x?.cg||""}return""
}
function bindCard(card,index){
 const update=()=>{readCard(card,index);validateAll(false);updateStats();};
 card.querySelector(".scene-id").oninput=update;card.querySelector(".scene-speaker").oninput=update;card.querySelector(".scene-text").oninput=update;
 card.querySelector(".scene-character").onchange=()=>{readCard(card,index);const id=card.querySelector(".scene-character").value;fillExpressions(card,index,id,"");readCard(card,index);validateAll(false);updateStats()};
 [".scene-expression",".scene-position",".scene-background",".scene-bgm",".scene-ambient",".scene-sfx",".scene-effect",".scene-camera",".scene-cg",".scene-end"].forEach(s=>card.querySelector(s).addEventListener("change",update));
 card.querySelector(".copy-scene").onclick=()=>{readAllCards();doc.scenes.splice(index+1,0,structuredClone(doc.scenes[index]));renumberIds(false);renderScenes();validateAll(false);updateStats()};
 card.querySelector(".delete-scene").onclick=()=>{if(!confirm(`${doc.scenes[index]?.id||"Scene"}을 삭제할까요?`))return;doc.scenes.splice(index,1);renumberIds(false);renderScenes();validateAll(false);updateStats()};
 card.addEventListener("dragstart",()=>{dragIndex=index;card.classList.add("dragging")});card.addEventListener("dragend",()=>{dragIndex=null;card.classList.remove("dragging");$$(".scene-card").forEach(c=>c.classList.remove("drag-over"))});
 card.addEventListener("dragover",e=>{e.preventDefault();card.classList.add("drag-over")});
 card.addEventListener("dragleave",()=>card.classList.remove("drag-over"));
 card.addEventListener("drop",e=>{e.preventDefault();if(dragIndex===null||dragIndex===index)return;readAllCards();const [m]=doc.scenes.splice(dragIndex,1);doc.scenes.splice(index,0,m);renumberIds(false);renderScenes();validateAll(false);updateStats()})
}
function readCard(card,index){
 const s=doc.scenes[index]||{};s.id=card.querySelector(".scene-id").value.trim();s.speaker=card.querySelector(".scene-speaker").value.trim();s.text=card.querySelector(".scene-text").value;
 setOpt(s,"background",card.querySelector(".scene-background").value);setOpt(s,"bgm",card.querySelector(".scene-bgm").value);setOpt(s,"ambient",card.querySelector(".scene-ambient").value);setOpt(s,"sfx",card.querySelector(".scene-sfx").value);setOpt(s,"effect",card.querySelector(".scene-effect").value);setOpt(s,"camera",card.querySelector(".scene-camera").value);
 const charId=card.querySelector(".scene-character").value;if(charId){s.character={id:charId,expression:card.querySelector(".scene-expression").value||characters[charId]?.defaultExpression||"default",position:card.querySelector(".scene-position").value||"center",visible:true}}else delete s.character;
 const cg=card.querySelector(".scene-cg").value;if(cg)s.cg=cg;else delete s.cg;
 if(card.querySelector(".scene-end").checked)s.end=true;else delete s.end;doc.scenes[index]=s
}
function setOpt(obj,key,value){if(value)obj[key]=value;else delete obj[key]}
function readAllCards(){$$(".scene-card").forEach(c=>readCard(c,+c.dataset.index));syncMeta()}
function renumberIds(render=true){
 readAllCards();const prefix=guessPrefix();doc.scenes.forEach((s,i)=>s.id=`${prefix}-s${String(i+1).padStart(3,"0")}`);if(render){renderScenes();validateAll(false)}
}
function validateAll(render=true){
 readAllCards();issues=[];const ids=new Map();
 doc.scenes.forEach((s,i)=>{
  if(!s.id)issue(i,"error","Scene ID 없음");else{if(ids.has(s.id)){issue(i,"error",`중복 ID: ${s.id}`);issue(ids.get(s.id),"error",`중복 ID: ${s.id}`)}ids.set(s.id,i)}
  if(!s.text?.trim())issue(i,"error","Text가 비어 있음");
  if(s.background&&!backgrounds[s.background])issue(i,"error",`미등록 Background: ${s.background}`);
  if(s.bgm&&!audio.bgm?.[s.bgm])issue(i,"error",`미등록 BGM: ${s.bgm}`);
  if(s.ambient&&!audio.ambient?.[s.ambient])issue(i,"error",`미등록 Ambient: ${s.ambient}`);
  if(s.sfx&&!audio.sfx?.[s.sfx])issue(i,"error",`미등록 SFX: ${s.sfx}`);
  if(s.character){
    const c=characters[s.character.id];if(!c)issue(i,"error",`미등록 Character: ${s.character.id}`);
    else if(s.character.expression&&!c.assets?.[s.character.expression])issue(i,"error",`미등록 Expression: ${s.character.expression}`);
    if(!s.speaker)issue(i,"error","나레이션 Scene에 Character가 표시됨");
    else if(c&&c.name!==s.speaker)issue(i,"warn",`화자(${s.speaker})와 Character(${c.name}) 불일치`);
  }
  const cg=s.cg||s.cgId||cgForScene(s.id);if(cg&&s.character)issue(i,"error","CG Scene에서 스탠딩 Character가 표시됨");
  if(s.text&&s.text.length>180)issue(i,"warn",`대사/본문 길이 ${s.text.length}자`);
 });
 if(doc.scenes.length&&!doc.scenes.at(-1).end)issue(doc.scenes.length-1,"warn","마지막 Scene에 end:true 없음");
 renderValidation();if(render)renderScenes();updateStats();
 const err=issues.filter(x=>x.level==="error").length,warn=issues.filter(x=>x.level==="warn").length;
 $("#validation-state").textContent=`오류 ${err} · 경고 ${warn}`;return{err,warn}
}
function issue(index,level,message){issues.push({index,level,message})}
function renderValidation(){
 const box=$("#validation-list");box.innerHTML="";
 if(!issues.length){box.innerHTML='<p class="help">오류나 경고가 없습니다.</p>';return}
 issues.forEach(x=>{const s=doc.scenes[x.index]||{},d=document.createElement("div");d.className=`validation-item ${x.level}`;d.innerHTML=`<strong>${esc(s.id||`#${x.index+1}`)}</strong><p>${esc(x.message)}</p>`;d.onclick=()=>scrollToScene(x.index);box.appendChild(d)})
}
function scrollToScene(index){const card=$(`.scene-card[data-index="${index}"]`);if(card)card.scrollIntoView({behavior:"smooth",block:"center"})}
function updateStats(){
 $("#stat-scenes").textContent=doc.scenes.length;$("#stat-dialogue").textContent=doc.scenes.filter(s=>s.speaker).length;$("#stat-narration").textContent=doc.scenes.filter(s=>!s.speaker).length;
 $("#stat-cg").textContent=doc.scenes.filter(s=>s.cg||s.cgId||cgForScene(s.id)).length;$("#stat-errors").textContent=issues.filter(x=>x.level==="error").length
}
function exportDoc(){readAllCards();doc.engineVersion=$("#engine-version").value||"0.9.9.5";doc.playMode="linear";doc.choices=false;return doc}
function download(name,text,type){const b=new Blob([text],{type}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function report(){
 validateAll(false);return`# Scene Editor Validation Report

- Version: 0.9.9.5
- Chapter: ${doc.id}
- Scene: ${doc.scenes.length}
- Errors: ${issues.filter(x=>x.level==="error").length}
- Warnings: ${issues.filter(x=>x.level==="warn").length}

## Issues
${issues.map(x=>`- [${x.level.toUpperCase()}] ${doc.scenes[x.index]?.id||x.index+1}: ${x.message}`).join("\n")||"- 없음"}
`}
$("#load-converter").onclick=()=>{const raw=localStorage.getItem("scene-editor-input");if(!raw)return alert("Converter에서 전달된 JSON이 없습니다.");try{loadDocument(JSON.parse(raw))}catch(e){alert(e.message)}};
$("#import-json").onclick=()=>$("#import-json-file").click();
$("#import-json-file").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{loadDocument(JSON.parse(await f.text()))}catch(err){alert(`JSON 오류: ${err.message}`)}};
$("#new-json").onclick=newDocument;
$("#add-scene").onclick=()=>addScene(true);$("#renumber-scenes").onclick=()=>renumberIds(true);$("#validate-scenes").onclick=()=>validateAll(true);
$("#scene-search").oninput=renderScenes;$("#scene-filter").onchange=renderScenes;
$("#raw-mode").onclick=()=>{$("#raw-json-textarea").value=JSON.stringify(exportDoc(),null,2);$("#raw-json-panel").hidden=false};
$("#close-raw-json").onclick=()=>$("#raw-json-panel").hidden=true;
$("#apply-raw-json").onclick=()=>{try{loadDocument(JSON.parse($("#raw-json-textarea").value));$("#raw-json-panel").hidden=true}catch(e){alert(`JSON 오류: ${e.message}`)}};
$("#download-json").onclick=()=>{const d=exportDoc();validateAll(false);download(`${d.id||"chapter"}.json`,JSON.stringify(d,null,2),"application/json;charset=utf-8")};
$("#download-report").onclick=()=>download(`${doc.id||"chapter"}-validation-report.md`,report(),"text/markdown;charset=utf-8");
$("#send-preview").onclick=()=>{
 const result=validateAll(false);
 if(result.err&&!confirm(`오류 ${result.err}건이 있습니다. 그래도 Preview를 실행할까요?`))return;
 const data=exportDoc();
 localStorage.setItem("game-preview-input",JSON.stringify(data));
 location.href="../game-preview/";
};
["#chapter-id","#chapter-title","#chapter-subtitle","#engine-version"].forEach(s=>$(s).addEventListener("input",syncMeta));
init().catch(e=>{$("#scene-state").textContent="초기화 실패";alert(e.message)});
