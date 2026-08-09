
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const base="../../../";
let manifest={documents:[]},characters={},backgrounds={},audio={bgm:{},ambient:{},sfx:{}};
let generated=null,warnings=[],speakerMap=new Map(),sourceMeta={};

const nameToCharacter=()=>Object.entries(characters).reduce((m,[id,c])=>{m[c.name]=id;return m},{});
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");

async function init(){
 [manifest,characters,backgrounds,audio]=await Promise.all([
   fetch(base+"story/manuscript/manifest.json").then(r=>r.json()),
   fetch(base+"game/data/system/characters.json").then(r=>r.json()),
   fetch(base+"game/data/system/backgrounds.json").then(r=>r.json()),
   fetch(base+"game/data/system/audio.json").then(r=>r.json())
 ]);
 fillSources();fillAssets();
 const draft=localStorage.getItem("scenario-converter-input");
 if(draft){$("#load-editor-draft").classList.add("has-draft")}
 if(manifest.documents.length) await loadSource();
}
function fillSources(){
 const s=$("#source-document");s.innerHTML="";
 manifest.documents.forEach(d=>{const o=document.createElement("option");o.value=d.id;o.textContent=`${d.volume}권 ${d.part}부 · ${d.title}`;s.appendChild(o)})
}
function fillAssets(){
 const bg=$("#default-background");bg.innerHTML="";
 Object.keys(backgrounds).forEach(id=>{const o=document.createElement("option");o.value=id;o.textContent=id;bg.appendChild(o)});
 if(backgrounds["part1-rainy-mountain-road"])bg.value="part1-rainy-mountain-road";
 const b=$("#default-bgm");Object.keys(audio.bgm||{}).forEach(id=>{const o=document.createElement("option");o.value=id;o.textContent=id;b.appendChild(o)});
 const a=$("#default-ambient");Object.keys(audio.ambient||{}).forEach(id=>{const o=document.createElement("option");o.value=id;o.textContent=id;a.appendChild(o)})
}
async function loadSource(){
 const d=manifest.documents.find(x=>x.id===$("#source-document").value);if(!d)return;
 const r=await fetch("../"+d.path.replace("../../",""));if(!r.ok)throw new Error("원본 Markdown 로드 실패");
 const text=await r.text();$("#markdown-input").value=text;sourceMeta={filename:d.filename,title:d.title,volume:d.volume,part:d.part};
 deriveDefaults(text,d);analyzeSpeakers();quickEstimate()
}
function loadDraft(){
 const raw=localStorage.getItem("scenario-converter-input");if(!raw)return alert("에디터에서 전달된 내용이 없습니다.");
 const d=JSON.parse(raw);$("#markdown-input").value=d.text||"";sourceMeta=d.metadata||{};
 deriveDefaults(d.text||"",sourceMeta);analyzeSpeakers();quickEstimate()
}
function deriveDefaults(text,meta={}){
 const chapter=text.match(/^#\s+(\d+)\장\s*[—\-:]?\s*(.*)$/m)||text.match(/^#\s*(\d+)\.\s*(.+)$/m);
 const chapterNo=chapter?+chapter[1]:1,title=chapter?chapter[2].trim()||`${chapterNo}장`:`${chapterNo}장`;
 const volume=meta.volume||1,part=meta.part||1;
 $("#chapter-id").value=`volume-${String(volume).padStart(2,"0")}-part-${String(part).padStart(2,"0")}-chapter-${String(chapterNo).padStart(2,"0")}`;
 $("#chapter-title").value=title;$("#scene-prefix").value=`c${String(chapterNo).padStart(2,"0")}`;$("#scene-start").value=1
}
function extractSpeakers(text){
 const out=new Map();
 text.split(/\r?\n/).forEach(line=>{
  const m=line.trim().match(/^([가-힣A-Za-z][가-힣A-Za-z0-9 _-]{0,19})\s*[:：]\s*(.+)$/);
  if(m && !/^https?$/i.test(m[1]))out.set(m[1],(out.get(m[1])||0)+1)
 });
 return out
}
function analyzeSpeakers(){
 const found=extractSpeakers($("#markdown-input").value), known=nameToCharacter(), box=$("#speaker-mapping");box.innerHTML="";speakerMap=new Map();
 if(!found.size){box.innerHTML='<p class="help">명시적 `인물명: 대사` 화자를 찾지 못했습니다. 인용문은 화자 미확정 대사로 변환됩니다.</p>';return}
 found.forEach((count,name)=>{
  const row=document.createElement("div");row.className="mapping-row";
  const sel=document.createElement("select");sel.dataset.speaker=name;
  sel.innerHTML='<option value="">스탠딩 없음 / 미등록</option>';
  Object.entries(characters).forEach(([id,c])=>{const o=document.createElement("option");o.value=id;o.textContent=`${c.name} (${id})`;sel.appendChild(o)});
  if(known[name])sel.value=known[name];speakerMap.set(name,sel.value);
  sel.onchange=()=>speakerMap.set(name,sel.value);
  row.innerHTML=`<strong>${esc(name)}</strong><small>${count}개 명시적 대사</small>`;row.appendChild(sel);box.appendChild(row)
 })
}
function splitLong(text,max){
 text=text.trim();if(text.length<=max)return[text];
 const result=[];let rest=text;
 while(rest.length>max){
  let cut=-1;for(const mark of [". ","다. ","요. ","! ","? ","。","… "]){
   const i=rest.lastIndexOf(mark,max);if(i>cut)cut=i+mark.length
  }
  if(cut<Math.floor(max*.45)){cut=rest.lastIndexOf(" ",max)}
  if(cut<Math.floor(max*.35))cut=max;
  result.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim()
 }
 if(rest)result.push(rest);return result
}
function stripMarkdown(text){
 return text.replace(/\*\*(.+?)\*\*/g,"$1").replace(/\*(.+?)\*/g,"$1").replace(/`(.+?)`/g,"$1").trim()
}
function parseMarkdown(text,maxChars){
 const lines=text.replace(/\r\n/g,"\n").split("\n"),units=[];let para=[],chapter=1,episode=null;
 const flush=()=>{if(!para.length)return;const value=stripMarkdown(para.join(" "));para=[];if(value)units.push({type:"narration",text:value,chapter,episode})};
 for(const raw of lines){
  const line=raw.trim();
  let m;
  if((m=line.match(/^#\s+(\d+)장\b\s*[—\-:]?\s*(.*)$/))){flush();chapter=+m[1];episode=null;continue}
  if((m=line.match(/^##\s+(\d+)화\b\s*[—\-:]?\s*(.*)$/))){flush();episode=+m[1];continue}
  if(/^#{1,6}\s+/.test(line)){flush();continue}
  if(/^---+$/.test(line)||!line){flush();continue}
  if((m=line.match(/^([가-힣A-Za-z][가-힣A-Za-z0-9 _-]{0,19})\s*[:：]\s*(.+)$/))){
    flush();units.push({type:"dialogue",speaker:m[1],text:stripMarkdown(m[2]).replace(/^["“]|["”]$/g,""),chapter,episode,explicitSpeaker:true});continue
  }
  if((m=line.match(/^>\s*(.+)$/))){
    flush();const t=stripMarkdown(m[1]);
    units.push({type:"dialogue",speaker:"",text:t.replace(/^["“]|["”]$/g,""),chapter,episode,explicitSpeaker:false});continue
  }
  if(/^[-*]\s+/.test(line)){para.push(line.replace(/^[-*]\s+/,""));continue}
  para.push(line)
 }
 flush();
 const expanded=[];
 units.forEach(u=>splitLong(u.text,maxChars).forEach(t=>expanded.push({...u,text:t})));
 return expanded
}
function recommendBackground(text,def){
 const rules=[
  [["비","폭우","빗물","산길"],"part1-rainy-mountain-road"],
  [["피","시체","혈흔"],"part1-bloodied-mountain-road"],
  [["숲","나무","수풀"],"part1-rainy-forest-night"],
  [["사찰","법당","절"],"part1-abandoned-temple-interior"],
  [["기록","보고서","회의","감찰"],"part1-orthodox-report-room"],
  [["복도","본단"],"part1-orthodox-corridor"],
  [["기억","환영","과거","목소리"],"part1-memory-overlay"],
  [["어둠","암전"],"part1-black"]
 ];
 for(const [words,id] of rules){if(backgrounds[id]&&words.some(w=>text.includes(w)))return{id,reason:words.find(w=>text.includes(w))}}
 return{id:def,reason:"default"}
}
function recommendEffect(text){
 const out={};
 if(/천둥|번개/.test(text)){out.effect="flash";if(audio.sfx?.thunder)out.sfx="thunder"}
 else if(/부서|충돌|들이받|폭발|무너/.test(text)){out.effect="shake"}
 else if(/기억|환영|과거|목소리/.test(text)){out.effect="memory";if(audio.sfx?.["memory-drone"])out.sfx="memory-drone"}
 if(/검을 뽑|검을 빼|발검/.test(text)&&audio.sfx?.["sword-draw"])out.sfx="sword-draw";
 if(/검.*부딪|검.*충돌/.test(text)&&audio.sfx?.["sword-clash"])out.sfx="sword-clash";
 return out
}
function buildScenes(){
 warnings=[];
 const max=+$("#max-chars").value||110,start=+$("#scene-start").value||1,prefix=$("#scene-prefix").value.trim()||"c01";
 const units=parseMarkdown($("#markdown-input").value,max),defbg=$("#default-background").value,bgm=$("#default-bgm").value,ambient=$("#default-ambient").value;
 let num=start,unknownQuotes=0;const scenes=[];
 units.forEach((u,index)=>{
  const id=`${prefix}-s${String(num++).padStart(3,"0")}`,scene={id,speaker:u.type==="dialogue"?u.speaker:"",text:u.text};
  const bg=$("#auto-background").checked?recommendBackground(u.text,defbg):{id:defbg,reason:"manual"};
  if(bg.id)scene.background=bg.id;
  if(index===0&&bgm)scene.bgm=bgm;if(index===0&&ambient)scene.ambient=ambient;
  if($("#auto-effect").checked)Object.assign(scene,recommendEffect(u.text));
  if(u.type==="dialogue"){
   if(!u.speaker){unknownQuotes++;warnings.push({level:"warn",scene:id,title:"화자 미확정 대사",message:`"${u.text.slice(0,55)}${u.text.length>55?"…":""}"`})}
   const charId=u.speaker?speakerMap.get(u.speaker):"";
   if(charId){
    const c=characters[charId];scene.character={id:charId,expression:c.defaultExpression||"default",position:c.defaultPosition||"center",visible:true}
   } else if(u.speaker){
    warnings.push({level:"info",scene:id,title:"캐릭터 미매핑",message:`${u.speaker}: 스탠딩 없이 대사만 생성`})
   }
  }
  if(bg.reason!=="default"&&bg.reason!=="manual")warnings.push({level:"info",scene:id,title:"배경 추천",message:`"${bg.reason}" → ${bg.id}`});
  scenes.push(scene)
 });
 if(scenes.length){scenes[0].effect=scenes[0].effect||"fade-in";scenes[scenes.length-1].effect=scenes[scenes.length-1].effect||"fade-out";scenes[scenes.length-1].end=true}
 const dialogue=scenes.filter(s=>s.speaker||units[scenes.indexOf(s)]?.type==="dialogue").length;
 const chars=scenes.reduce((n,s)=>n+s.text.length,0);
 const seconds=chars/16+scenes.length*1.25;
 return{scenes,dialogue,narration:scenes.length-dialogue,seconds,unknownQuotes}
}
function makeDocument(result){
 const title=$("#chapter-title").value.trim()||"Untitled";
 return{
  id:$("#chapter-id").value.trim(),
  title,
  subtitle:"Markdown 자동 변환본",
  status:"generated",
  canon:"source-derived",
  scenes:result.scenes,
  engineVersion:"0.9.9.3",
  dataVersion:"converter-1.0",
  playMode:"linear",
  choices:false,
  conversion:{
   source:sourceMeta.filename||"browser-editor",
   generatedAt:new Date().toISOString(),
   maxChars:+$("#max-chars").value||110,
   automaticBackground:$("#auto-background").checked,
   automaticEffect:$("#auto-effect").checked,
   speakerOnlyCharacter:true
  }
 }
}
function quickEstimate(){
 const r=buildScenes();updateAnalysis(r,false)
}
function updateAnalysis(r,withWarnings=true){
 $("#scene-count").textContent=r.scenes.length;$("#dialogue-count").textContent=r.dialogue;$("#narration-count").textContent=r.narration;
 $("#play-time").textContent=r.seconds<60?`${Math.ceil(r.seconds)}초`:`약 ${Math.ceil(r.seconds/60)}분`;
 if(withWarnings){$("#warning-count").textContent=warnings.filter(w=>w.level!=="info").length;$("#warning-state").textContent=`경고 ${warnings.filter(w=>w.level!=="info").length}`}
}
function renderWarnings(){
 const box=$("#warnings-list");box.innerHTML="";
 if(!warnings.length){box.innerHTML='<p class="help">경고가 없습니다.</p>';return}
 warnings.slice(0,300).forEach(w=>{const d=document.createElement("div");d.className=`warning-item ${w.level}`;
 d.innerHTML=`<strong>${esc(w.scene||"분석")} · ${esc(w.title)}</strong><p>${esc(w.message)}</p>`;box.appendChild(d)})
 if(warnings.length>300){const p=document.createElement("p");p.className="help";p.textContent=`추가 ${warnings.length-300}개 항목은 분석 보고서에서 확인하세요.`;box.appendChild(p)}
}
function renderScenes(){
 const q=$("#scene-filter").value.trim().toLowerCase(),box=$("#scene-preview-list");box.innerHTML="";
 if(!generated)return;
 generated.scenes.filter(s=>`${s.id} ${s.speaker} ${s.text}`.toLowerCase().includes(q)).slice(0,500).forEach(s=>{
  const d=document.createElement("div");d.className="scene-card";d.innerHTML=`<span class="id">${esc(s.id)}</span><span class="speaker">${esc(s.speaker||"나레이션")}</span>
  <span class="text">${esc(s.text)}</span><span class="meta">${esc(s.background||"-")} ${s.character?`· ${s.character.id}`:""} ${s.effect?`· ${s.effect}`:""}</span>`;box.appendChild(d)
 })
}
function convert(){
 analyzeSpeakersFromDOM();
 const r=buildScenes();generated=makeDocument(r);$("#json-output").value=JSON.stringify(generated,null,2);updateAnalysis(r,true);renderWarnings();renderScenes();
 $("#parse-state").textContent=`변환 완료 · ${r.scenes.length} Scene`;
 if(!r.scenes.length)warnings.push({level:"error",title:"Scene 없음",message:"변환 가능한 본문이 없습니다."})
}
function analyzeSpeakersFromDOM(){
 $$("#speaker-mapping select").forEach(s=>speakerMap.set(s.dataset.speaker,s.value))
}
function download(name,text,type){
 const b=new Blob([text],{type}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)
}
function report(){
 if(!generated)return "";
 const counts={};
 generated.scenes.forEach(s=>{counts[s.background]=(counts[s.background]||0)+1});
 return `# Markdown → JSON 변환 분석 보고서

- 버전: 0.9.9.3
- 생성 일시: ${new Date().toISOString()}
- 소스: ${generated.conversion.source}
- Scene: ${generated.scenes.length}
- 대사: ${generated.scenes.filter(s=>s.speaker).length}
- 나레이션: ${generated.scenes.filter(s=>!s.speaker).length}
- 경고: ${warnings.filter(w=>w.level!=="info").length}

## 배경 사용
${Object.entries(counts).map(([k,v])=>`- ${k}: ${v}`).join("\n")}

## 경고 및 추천
${warnings.map(w=>`- [${w.level.toUpperCase()}] ${w.scene||"-"} ${w.title}: ${w.message}`).join("\n")||"- 없음"}
`
}
$("#load-source").onclick=()=>loadSource().catch(e=>alert(e.message));
$("#load-editor-draft").onclick=loadDraft;
$("#import-md").onclick=()=>$("#import-md-file").click();
$("#import-md-file").onchange=async e=>{const f=e.target.files[0];if(!f)return;$("#markdown-input").value=await f.text();sourceMeta={filename:f.name};deriveDefaults($("#markdown-input").value,{});analyzeSpeakers();quickEstimate()};
$("#refresh-speakers").onclick=analyzeSpeakers;
$("#convert-btn").onclick=convert;$("#reset-btn").onclick=()=>{generated=null;warnings=[];$("#json-output").value="";$("#warnings-list").innerHTML="";$("#scene-preview-list").innerHTML="";quickEstimate()};
$("#copy-json").onclick=async()=>{if(!generated)return;await navigator.clipboard.writeText($("#json-output").value);$("#copy-json").textContent="복사 완료";setTimeout(()=>$("#copy-json").textContent="복사",1000)};
$("#download-json").onclick=()=>{if(!generated)return;download(`${$("#chapter-id").value||"chapter"}.json`,$("#json-output").value,"application/json;charset=utf-8")};
$("#download-report").onclick=()=>{if(!generated)return;download(`${$("#chapter-id").value||"chapter"}-conversion-report.md`,report(),"text/markdown;charset=utf-8")};
$("#send-scene-editor").onclick=()=>{
 if(!generated)return alert("먼저 JSON 변환을 실행하세요.");
 localStorage.setItem("scene-editor-input",JSON.stringify(generated));
 location.href="../scene-editor/";
};
$("#scene-filter").oninput=renderScenes;
$("#markdown-input").oninput=()=>{analyzeSpeakers();quickEstimate()};
["#max-chars","#scene-start","#scene-prefix","#default-background","#default-bgm","#default-ambient","#auto-background","#auto-effect"].forEach(s=>$(s).addEventListener("change",quickEstimate));
init().catch(e=>{$("#parse-state").textContent="초기화 실패";$("#warnings-list").innerHTML=`<div class="warning-item error"><strong>초기화 오류</strong><p>${esc(e.message)}</p></div>`});
