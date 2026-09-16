
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const base="../../../";
let characters={},backgrounds={},audio={bgm:{},ambient:{},sfx:{}},cgManifest={items:{}};
let doc=null,index=0,autoTimer=null,muted=false,errorsByScene=new Map(),consoleLines=[];

const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
function log(level,msg,sceneId=""){
 const item={level,msg,sceneId,time:new Date().toLocaleTimeString()};consoleLines.push(item);if(consoleLines.length>250)consoleLines.shift();
 renderConsole()
}
function renderConsole(){
 const box=$("#preview-console");box.innerHTML=consoleLines.slice().reverse().map(x=>`<div class="console-line ${x.level}">[${esc(x.time)}] ${x.sceneId?`[${esc(x.sceneId)}] `:""}${esc(x.msg)}</div>`).join("")
}
async function init(){
 [characters,backgrounds,audio,cgManifest]=await Promise.all([
  fetch(base+"game/data/system/characters.json").then(r=>r.json()),
  fetch(base+"game/data/system/backgrounds.json").then(r=>r.json()),
  fetch(base+"game/data/system/audio.json").then(r=>r.json()),
  fetch(base+"game/data/system/scene-cg.json").then(r=>r.json()).catch(()=>({items:{}}))
 ]);
 const raw=localStorage.getItem("game-preview-input");
 if(raw){try{loadDocument(JSON.parse(raw));log("info","Scene Editor 전달 JSON 자동 로드")}catch(e){log("error",e.message)}}
 else setEmptyState()
}
function setEmptyState(){
 $("#load-status").textContent="JSON 입력 대기";$("#asset-status").textContent="에셋 검사 전";$("#scene-jump").innerHTML="";
}
function normalizePath(path){
 if(!path)return"";return path.replace(/^\.\//,"../../../game/")
}
function resolveGameAsset(path){
 if(!path)return"";if(path.startsWith("http")||path.startsWith("data:"))return path;
 return path.startsWith("./")?base+"game/"+path.slice(2):base+"game/"+path
}
function cgEntry(scene){
 if(scene.cg){
  const direct=cgManifest.items?.[scene.cg];if(direct)return direct;
  const byId=Object.values(cgManifest.items||{}).find(x=>x.sceneId===scene.id||x.title===scene.cg);if(byId)return byId
 }
 return cgManifest.items?.[scene.id]||null
}
function cgPath(scene){
 const entry=cgEntry(scene);if(entry?.game)return resolveGameAsset(entry.game);
 if(scene.cg&&/\.(webp|png|jpg|jpeg|svg)$/i.test(scene.cg))return resolveGameAsset(scene.cg);
 return""
}
function characterAsset(scene){
 const id=scene.character?.id;if(!id||!characters[id])return null;
 const c=characters[id],expr=scene.character.expression||c.defaultExpression||"default";
 let path=c.assets?.[expr]||c.assets?.default;
 if(!path&&c.battleAssets?.[expr])path=c.battleAssets[expr];
 return path?{id,name:c.name,expr,path:resolveGameAsset(path),position:scene.character.position||c.defaultPosition||"center"}:null
}
function inspectScene(scene){
 const issues=[],rows=[];
 const add=(label,value,status="ok")=>rows.push({label,value:value||"-",status});
 if(scene.background){
  if(backgrounds[scene.background])add("Background",scene.background,"ok");else{add("Background",scene.background,"error");issues.push({level:"error",msg:`미등록 Background: ${scene.background}`})}
 }else add("Background","없음","warn");
 const cg=cgEntry(scene);if(cg)add("CG",cg.sceneId||scene.cg||scene.id,"ok");else if(scene.cg){add("CG",scene.cg,"error");issues.push({level:"error",msg:`CG 매핑 없음: ${scene.cg}`})}
 const ch=characterAsset(scene);
 if(scene.character){
  if(!characters[scene.character.id]){add("Character",scene.character.id,"error");issues.push({level:"error",msg:`미등록 Character: ${scene.character.id}`})}
  else if(!ch){add("Character",`${scene.character.id}/${scene.character.expression}`,"error");issues.push({level:"error",msg:"Character 이미지 없음"})}
  else add("Character",`${ch.name}/${ch.expr}`,"ok")
 }
 if((cg||scene.cg)&&scene.character)issues.push({level:"error",msg:"CG Scene에서 Character 동시 노출"});
 if(scene.character&&!scene.speaker)issues.push({level:"error",msg:"나레이션 Scene에 Character 노출"});
 if(scene.bgm){if(audio.bgm?.[scene.bgm])add("BGM",scene.bgm,"ok");else{add("BGM",scene.bgm,"error");issues.push({level:"error",msg:`미등록 BGM: ${scene.bgm}`})}}
 if(scene.ambient){if(audio.ambient?.[scene.ambient])add("Ambient",scene.ambient,"ok");else{add("Ambient",scene.ambient,"error");issues.push({level:"error",msg:`미등록 Ambient: ${scene.ambient}`})}}
 if(scene.sfx){if(audio.sfx?.[scene.sfx])add("SFX",scene.sfx,"ok");else{add("SFX",scene.sfx,"error");issues.push({level:"error",msg:`미등록 SFX: ${scene.sfx}`})}}
 return{issues,rows}
}
function validateDocument(){
 errorsByScene=new Map();let errors=0,warnings=0;
 (doc?.scenes||[]).forEach((s,i)=>{const r=inspectScene(s);errorsByScene.set(i,r.issues);errors+=r.issues.filter(x=>x.level==="error").length;warnings+=r.issues.filter(x=>x.level==="warn").length});
 $("#debug-error-count").textContent=errors;$("#debug-warning-count").textContent=warnings;$("#asset-status").textContent=errors?`에셋 오류 ${errors}`:"에셋 검사 PASS";
 renderTimeline()
}
function loadDocument(data){
 if(!data||!Array.isArray(data.scenes))throw new Error("scenes 배열이 없는 JSON입니다.");
 stopAuto();doc=structuredClone(data);index=0;$("#debug-scene-count").textContent=doc.scenes.length;$("#load-status").textContent=`로드 완료 · ${doc.scenes.length} Scene`;
 fillJump();validateDocument();renderScene(0);log("info",`${doc.id||"chapter"} 로드 (${doc.scenes.length} Scene)`)
}
function fillJump(){
 const s=$("#scene-jump");s.innerHTML="";
 doc.scenes.forEach((x,i)=>{const o=document.createElement("option");o.value=i;o.textContent=`${x.id||i+1} · ${(x.speaker||"나레이션")} · ${(x.text||"").slice(0,30)}`;s.appendChild(o)})
}
function clearStageClasses(){
 const st=$("#preview-stage");[...st.classList].filter(c=>c.startsWith("fx-")||c.startsWith("cam-")).forEach(c=>st.classList.remove(c))
}
function applyEffect(scene){
 clearStageClasses();const st=$("#preview-stage");
 if(scene.effect)st.classList.add(`fx-${scene.effect}`);if(scene.camera)st.classList.add(`cam-${scene.camera}`)
}
function hideCharacters(){
 ["left","center","right"].forEach(pos=>{const el=$(`#preview-character-${pos}`);el.classList.remove("visible");el.removeAttribute("src")})
}
async function renderScene(i){
 if(!doc?.scenes?.length)return;
 index=Math.max(0,Math.min(i,doc.scenes.length-1));const scene=doc.scenes[index];$("#scene-jump").value=String(index);
 $("#preview-chapter-title").textContent=doc.title||doc.id||"Preview";$("#current-scene-id").textContent=scene.id||`#${index+1}`;
 $("#preview-speaker").textContent=scene.speaker||"";$("#preview-speaker").style.display=scene.speaker?"inline-block":"none";$("#preview-dialogue").textContent=scene.text||"";
 const bg=$("#preview-background");if(scene.background&&backgrounds[scene.background])bg.style.backgroundImage=`url("${resolveGameAsset(backgrounds[scene.background])}")`;else bg.style.backgroundImage="";
 const cg=cgPath(scene),cgBox=$("#preview-cg"),cgImg=$("#preview-cg-image");
 if(cg){hideCharacters();cgImg.src=cg;cgBox.classList.add("visible")}else{
  cgBox.classList.remove("visible");cgImg.removeAttribute("src");hideCharacters();
  const ch=characterAsset(scene);if(ch&&scene.speaker){const el=$(`#preview-character-${ch.position}`)||$("#preview-character-center");el.src=ch.path;el.classList.add("visible")}
 }
 applyEffect(scene);await playAudio(scene);renderInspector(scene);renderTimelineActive();log("info","Scene 렌더링",scene.id||String(index+1))
}
function audioPath(kind,id){
 const v=audio[kind]?.[id];if(!v)return"";return resolveGameAsset(typeof v==="string"?v:v.path)
}
async function playChannel(el,src,loop){
 if(!src){if(el.dataset.current){el.pause();el.removeAttribute("src");el.dataset.current=""}return}
 if(el.dataset.current===src)return;el.pause();el.src=src;el.loop=loop;el.muted=muted;el.dataset.current=src;
 try{await el.play()}catch(e){log("warn",`오디오 자동재생 차단: ${e.message}`)}
}
async function playAudio(scene){
 await playChannel($("#preview-bgm"),scene.bgm?audioPath("bgm",scene.bgm):$("#preview-bgm").dataset.current,true);
 await playChannel($("#preview-ambient"),scene.ambient?audioPath("ambient",scene.ambient):$("#preview-ambient").dataset.current,true);
 if(scene.sfx){const s=$("#preview-sfx");s.src=audioPath("sfx",scene.sfx);s.muted=muted;try{await s.play()}catch(e){log("warn",`SFX 재생 차단: ${e.message}`,scene.id)}}
}
function renderInspector(scene){
 const r=inspectScene(scene),box=$("#asset-inspector");box.innerHTML="";
 r.rows.forEach(x=>{const d=document.createElement("div");d.className=`asset-row ${x.status}`;d.innerHTML=`<span>${esc(x.label)}</span><strong>${esc(x.value)}</strong>`;box.appendChild(d)});
 if(!r.rows.length)box.innerHTML='<p class="help">이 Scene에 지정된 에셋이 없습니다.</p>';
 r.issues.forEach(x=>log(x.level,x.msg,scene.id))
}
function next(){if(!doc)return;if(index<doc.scenes.length-1)renderScene(index+1);else stopAuto()}
function prev(){if(doc&&index>0)renderScene(index-1)}
function startAuto(){
 if(!doc)return;if(autoTimer){stopAuto();return}
 $("#auto-play").textContent="Auto Stop";const ms=+$("#auto-speed").value||3500;autoTimer=setInterval(next,ms)
}
function stopAuto(){if(autoTimer)clearInterval(autoTimer);autoTimer=null;$("#auto-play").textContent="Auto Play"}
function viewport(mode){const shell=$("#device-shell");shell.className=`device-shell ${mode}`}
function renderTimeline(){
 const box=$("#scene-timeline"),q=$("#timeline-search").value.trim().toLowerCase();box.innerHTML="";if(!doc)return;
 doc.scenes.forEach((s,i)=>{if(q&&!`${s.id} ${s.speaker||""} ${s.text||""}`.toLowerCase().includes(q))return;
  const d=document.createElement("div");d.className="timeline-card";if((errorsByScene.get(i)||[]).some(x=>x.level==="error"))d.classList.add("error");
  d.dataset.index=i;d.innerHTML=`<span class="id">${esc(s.id||String(i+1))}</span><div class="speaker">${esc(s.speaker||"나레이션")}</div><div class="text">${esc(s.text||"")}</div>`;d.onclick=()=>renderScene(i);box.appendChild(d)})
 renderTimelineActive()
}
function renderTimelineActive(){$$(".timeline-card").forEach(x=>x.classList.toggle("active",+x.dataset.index===index))}
function returnToEditor(){
 if(!doc)return location.href="../scene-editor/";
 localStorage.setItem("scene-editor-input",JSON.stringify(doc));location.href="../scene-editor/"
}
$("#load-scene-editor").onclick=()=>{const raw=localStorage.getItem("game-preview-input");if(!raw)return alert("Scene Editor에서 전달된 JSON이 없습니다.");try{loadDocument(JSON.parse(raw))}catch(e){alert(e.message)}};
$("#import-json").onclick=()=>$("#import-json-file").click();
$("#import-json-file").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{loadDocument(JSON.parse(await f.text()))}catch(err){alert(`JSON 오류: ${err.message}`)}};
$("#back-scene-editor").onclick=returnToEditor;$("#viewport-mode").onchange=e=>viewport(e.target.value);$("#scene-jump").onchange=e=>renderScene(+e.target.value);
$("#prev-scene").onclick=prev;$("#next-scene").onclick=next;$("#auto-play").onclick=startAuto;$("#auto-speed").onchange=()=>{if(autoTimer){stopAuto();startAuto()}};
$("#mute-preview").onclick=()=>{muted=!muted;["#preview-bgm","#preview-ambient","#preview-sfx"].forEach(s=>$(s).muted=muted);$("#mute-preview").textContent=muted?"🔇 Muted":"🔊 Sound"};
$("#clear-console").onclick=()=>{consoleLines=[];renderConsole()};$("#timeline-search").oninput=renderTimeline;
addEventListener("keydown",e=>{if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;if(e.key==="ArrowRight"||e.key===" ")next();if(e.key==="ArrowLeft")prev()});
init().catch(e=>{log("error",`초기화 실패: ${e.message}`);$("#load-status").textContent="초기화 실패"});
