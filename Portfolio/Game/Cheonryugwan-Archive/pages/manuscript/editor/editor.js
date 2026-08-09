
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const manifestUrl="../../../story/manuscript/manifest.json";

let manifest={version:"0.9.9.2",documents:[]};
let currentDoc=null,originalText="",history=[],historyIndex=-1,saveTimer=null;
const editor=$("#markdown-editor"),preview=$("#markdown-preview"),workspace=$("#workspace");

function esc(s){return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function inline(s){return esc(s).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`(.+?)`/g,"<code>$1</code>")}
function markdownToHtml(text){
 const out=[];let para=[],ul=false,n=0;
 const flush=()=>{if(para.length){out.push(`<p>${inline(para.join(" "))}</p>`);para=[]}};
 const close=()=>{if(ul){out.push("</ul>");ul=false}};
 text.replace(/\r\n/g,"\n").split("\n").forEach(line=>{
  const h=line.match(/^(#{1,6})\s+(.+)$/),li=line.match(/^\s*[-*]\s+(.+)$/),q=line.match(/^>\s?(.*)$/);
  if(h){flush();close();out.push(`<h${h[1].length} id="p-${n++}">${inline(h[2])}</h${h[1].length}>`)}
  else if(li){flush();if(!ul){out.push("<ul>");ul=true}out.push(`<li>${inline(li[1])}</li>`)}
  else if(q){flush();close();out.push(`<blockquote>${inline(q[1])}</blockquote>`)}
  else if(/^---+$/.test(line.trim())){flush();close();out.push("<hr>")}
  else if(!line.trim()){flush();close()}else para.push(line.trim());
 });flush();close();return out.join("\n");
}
function extractMeta(text,filename){
 const first=text.split("\n").find(x=>x.startsWith("# "));
 const match=filename.match(/(\d+)권-(\d+)부/);
 return {title:first?first.slice(2).trim():filename.replace(/\.md$/i,""),volume:match?+match[1]:1,part:match?+match[2]:1};
}
function stats(text){
 return {chars:text.replace(/\n/g,"").length,paragraphs:text.split(/\n\s*\n/).filter(x=>x.trim()).length,
 chapters:(text.match(/^#\s+\d+장/gm)||[]).length,episodes:(text.match(/^##\s+\d+화/gm)||[]).length};
}
function syncMetaFromFilename(){
 const m=$("#filename").value.match(/(\d+)권-(\d+)부/);
 if(m){$("#volume-number").value=m[1];$("#part-number").value=m[2]}
}
function render(){
 const text=editor.value;
 preview.innerHTML=markdownToHtml(text)||"<p>미리보기 내용이 없습니다.</p>";
 const s=stats(text);
 $("#char-count").textContent=s.chars.toLocaleString();$("#paragraph-count").textContent=s.paragraphs.toLocaleString();
 $("#chapter-count").textContent=s.chapters;$("#episode-count").textContent=s.episodes;
 $("#preview-title").textContent=$("#document-title").value||extractMeta(text,$("#filename").value).title;
 renderDiff();
 $("#dirty-indicator").textContent=text===originalText?"변경 없음":"저장하지 않은 변경";
 $("#dirty-indicator").classList.toggle("dirty",text!==originalText);
}
function pushHistory(){
 const value=editor.value;
 if(history[historyIndex]===value)return;
 history=history.slice(0,historyIndex+1);history.push(value);historyIndex=history.length-1;
 if(history.length>100){history.shift();historyIndex--}
}
function autosave(){
 clearTimeout(saveTimer);saveTimer=setTimeout(()=>{
  const key=`scenario-autosave:${$("#filename").value||"untitled.md"}`;
  localStorage.setItem(key,JSON.stringify({text:editor.value,metadata:getMetadata(),savedAt:new Date().toISOString()}));
  $("#autosave-state").textContent=`임시 저장 ${new Date().toLocaleTimeString()}`;
 },600);
}
function getMetadata(){
 return {filename:$("#filename").value,title:$("#document-title").value,volume:+$("#volume-number").value||1,
 part:+$("#part-number").value||1,status:$("#document-status").value,versionNote:$("#version-note").value};
}
function setMetadata(m){
 $("#filename").value=m.filename||"1권-1부.md";$("#document-title").value=m.title||"";
 $("#volume-number").value=m.volume||1;$("#part-number").value=m.part||1;
 $("#document-status").value=m.status||"draft";$("#version-note").value=m.versionNote||"";
}
function loadIntoEditor(text,meta,asOriginal=true){
 editor.value=text;setMetadata(meta);if(asOriginal)originalText=text;
 history=[text];historyIndex=0;render();updateCursor();autosave();
}
async function loadManifest(){
 const r=await fetch(manifestUrl);manifest=await r.json();manifest.version="0.9.9.2";
 const sel=$("#document-select");sel.innerHTML="";
 manifest.documents.forEach(d=>{const o=document.createElement("option");o.value=d.id;o.textContent=`${d.volume}권 ${d.part}부 · ${d.title}`;sel.appendChild(o)});
}
async function loadSelected(){
 const d=manifest.documents.find(x=>x.id===$("#document-select").value);if(!d)return;
 const r=await fetch("../"+d.path.replace("../../","")); // editor is one level deeper
 if(!r.ok)throw new Error("markdown load failed");
 const text=await r.text();currentDoc=d;
 loadIntoEditor(text,{filename:d.filename,title:d.title,volume:d.volume,part:d.part,status:d.status,versionNote:""},true);
}
function newDocument(){
 currentDoc=null;
 const text="# 새 시나리오\n\n# 1장\n\n## 1화\n\n새로운 이야기를 작성하세요.\n";
 loadIntoEditor(text,{filename:"1권-1부.md",title:"새 시나리오",volume:1,part:1,status:"draft",versionNote:"신규 문서"},true);
}
function lineDiff(a,b){
 const A=a.replace(/\r\n/g,"\n").split("\n"),B=b.replace(/\r\n/g,"\n").split("\n");
 const n=A.length,m=B.length,dp=Array.from({length:n+1},()=>new Uint32Array(m+1));
 for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=A[i]===B[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
 const rows=[];let i=0,j=0;
 while(i<n||j<m){
  if(i<n&&j<m&&A[i]===B[j]){rows.push({t:"equal",a:i++,b:j++,v:A[i-1]})}
  else if(j<m&&(i===n||dp[i][j+1]>=dp[i+1][j])){rows.push({t:"add",a:null,b:j,v:B[j++]})}
  else{rows.push({t:"delete",a:i,b:null,v:A[i++]})}
 }
 return rows;
}
function renderDiff(){
 const rows=lineDiff(originalText,editor.value),out=$("#diff-output");out.innerHTML="";
 let add=0,del=0;
 rows.forEach(r=>{if(r.t==="add")add++;if(r.t==="delete")del++;
  const line=document.createElement("div");line.className=`diff-line ${r.t}`;
  line.innerHTML=`<span>${r.a===null?"":r.a+1}</span><span>${r.b===null?"":r.b+1}</span><code>${esc(r.v)}</code>`;out.appendChild(line)
 });
 const changed=Math.max(add,del);$("#diff-summary").textContent=`추가 ${add} · 삭제 ${del} · 변경 추정 ${changed}`;
 $("#changed-line-count").textContent=add+del;
}
function updateCursor(){
 const p=editor.selectionStart,before=editor.value.slice(0,p),line=before.split("\n").length,col=p-before.lastIndexOf("\n");
 $("#cursor-position").textContent=`${line}행 ${col}열`;
}
function findNext(){
 const q=$("#find-text").value;if(!q)return;let start=editor.selectionEnd,index=editor.value.indexOf(q,start);
 if(index<0)index=editor.value.indexOf(q);if(index>=0){editor.focus();editor.setSelectionRange(index,index+q.length)}
}
function replaceOne(){
 const q=$("#find-text").value,r=$("#replace-text").value;if(!q)return;
 if(editor.value.slice(editor.selectionStart,editor.selectionEnd)===q){
  editor.setRangeText(r,editor.selectionStart,editor.selectionEnd,"end");pushHistory();render();autosave()
 }else findNext();
}
function replaceAll(){
 const q=$("#find-text").value;if(!q)return;editor.value=editor.value.split(q).join($("#replace-text").value);pushHistory();render();autosave()
}
function download(name,bytes,type="application/octet-stream"){
 const blob=bytes instanceof Blob?bytes:new Blob([bytes],{type});const a=document.createElement("a");
 a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function buildManifestEntry(){
 const m=getMetadata(),s=stats(editor.value),id=`volume-${String(m.volume).padStart(2,"0")}-part-${String(m.part).padStart(2,"0")}`;
 return {id,volume:m.volume,part:m.part,title:m.title||extractMeta(editor.value,m.filename).title,filename:m.filename,
 path:`../../story/manuscript/volume-${String(m.volume).padStart(2,"0")}/original/${m.filename}`,status:m.status,
 chapters:s.chapters,episodes:s.episodes,characters:s.chars,paragraphs:s.paragraphs,versionNote:m.versionNote};
}
function updatedManifest(){
 const copy=JSON.parse(JSON.stringify(manifest)),entry=buildManifestEntry(),i=copy.documents.findIndex(d=>d.id===entry.id);
 if(i>=0)copy.documents[i]={...copy.documents[i],...entry};else copy.documents.push(entry);
 copy.version="0.9.9.2";copy.documents.sort((a,b)=>a.volume-b.volume||a.part-b.part);return copy;
}
// Store-only ZIP writer
function crc32(bytes){
 let c=0xffffffff;for(const b of bytes){c^=b;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0
}
function u16(v){return new Uint8Array([v&255,(v>>>8)&255])}
function u32(v){return new Uint8Array([v&255,(v>>>8)&255,(v>>>16)&255,(v>>>24)&255])}
function join(parts){let len=parts.reduce((s,p)=>s+p.length,0),o=new Uint8Array(len),n=0;parts.forEach(p=>{o.set(p,n);n+=p.length});return o}
function makeZip(files){
 const enc=new TextEncoder(),locals=[],centrals=[];let offset=0;
 files.forEach(f=>{const name=enc.encode(f.name),data=typeof f.data==="string"?enc.encode(f.data):f.data,crc=crc32(data);
  const local=join([u32(0x04034b50),u16(20),u16(0x800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),name,data]);
  locals.push(local);
  const central=join([u32(0x02014b50),u16(20),u16(20),u16(0x800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),
   u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(offset),name]);centrals.push(central);offset+=local.length
 });
 const central=join(centrals),end=join([u32(0x06054b50),u16(0),u16(0),u16(files.length),u16(files.length),u32(central.length),u32(offset),u16(0)]);
 return new Blob([...locals,central,end],{type:"application/zip"});
}
function downloadZip(){
 const m=getMetadata(),mf=JSON.stringify(updatedManifest(),null,2);
 const note=`# 시나리오 편집 내보내기\n\n- 파일: ${m.filename}\n- 제목: ${m.title}\n- 상태: ${m.status}\n- 버전 메모: ${m.versionNote||"-"}\n- 생성: ${new Date().toISOString()}\n`;
 download(`scenario-editor-${m.filename.replace(/\.md$/i,"")}.zip`,makeZip([
  {name:`manuscript/${m.filename}`,data:editor.value},{name:"manifest.json",data:mf},{name:"EXPORT_NOTE.md",data:note}
 ]));
}
editor.addEventListener("input",()=>{pushHistory();render();updateCursor();autosave()});
editor.addEventListener("click",updateCursor);editor.addEventListener("keyup",updateCursor);
$("#filename").addEventListener("input",()=>{syncMetaFromFilename();render();autosave()});
$$(".metadata-panel input,.metadata-panel select").forEach(x=>x.addEventListener("input",()=>{render();autosave()}));
$("#load-document").onclick=()=>loadSelected().catch(e=>alert(e.message));
$("#new-document").onclick=newDocument;$("#import-document").onclick=()=>$("#import-file").click();
$("#import-file").onchange=async e=>{const f=e.target.files[0];if(!f)return;const t=await f.text(),meta=extractMeta(t,f.name);
 currentDoc=null;loadIntoEditor(t,{filename:f.name,title:meta.title,volume:meta.volume,part:meta.part,status:"draft",versionNote:"로컬 파일 가져오기"},true)};
$("#restore-autosave").onclick=()=>{const key=`scenario-autosave:${$("#filename").value||"untitled.md"}`,x=localStorage.getItem(key);if(!x)return alert("복원할 임시 저장이 없습니다.");
 const data=JSON.parse(x);loadIntoEditor(data.text,data.metadata,false)};
$("#undo-btn").onclick=()=>{if(historyIndex>0){historyIndex--;editor.value=history[historyIndex];render()}};
$("#redo-btn").onclick=()=>{if(historyIndex<history.length-1){historyIndex++;editor.value=history[historyIndex];render()}};
$("#fullscreen-btn").onclick=()=>document.body.classList.toggle("editor-fullscreen");
$("#find-next").onclick=findNext;$("#replace-one").onclick=replaceOne;$("#replace-all").onclick=replaceAll;
$$(".mobile-tabs button").forEach(b=>b.onclick=()=>{$$(".mobile-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 workspace.className=`workspace view-${b.dataset.view}`});
$("#download-markdown").onclick=()=>download($("#filename").value||"scenario.md",editor.value,"text/markdown;charset=utf-8");
$("#download-manifest").onclick=()=>download("manifest.json",JSON.stringify(updatedManifest(),null,2),"application/json;charset=utf-8");
$("#download-zip").onclick=downloadZip;

$("#send-converter").onclick=()=>{
  localStorage.setItem("scenario-converter-input",JSON.stringify({
    text:editor.value,
    metadata:getMetadata(),
    sentAt:new Date().toISOString()
  }));
  location.href="../converter/";
};

addEventListener("beforeunload",e=>{if(editor.value!==originalText){e.preventDefault();e.returnValue=""}});
loadManifest().then(()=>{if(manifest.documents.length)loadSelected();else newDocument()}).catch(()=>newDocument());
