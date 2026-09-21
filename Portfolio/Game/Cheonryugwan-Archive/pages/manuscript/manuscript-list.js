
const list=document.querySelector("#document-list");
const search=document.querySelector("#document-search");
const status=document.querySelector("#status-filter");
const empty=document.querySelector("#empty-state");
let docs=[];
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
function render(){
 const q=search.value.trim().toLowerCase(), f=status.value;
 const rows=docs.filter(d=>(f==="all"||d.status===f)&&`${d.title} ${d.filename}`.toLowerCase().includes(q));
 list.innerHTML=""; empty.hidden=rows.length>0;
 const groups=new Map();
 rows.forEach(d=>{const k=`${d.volume}권`; if(!groups.has(k))groups.set(k,[]); groups.get(k).push(d)});
 groups.forEach((items,label)=>{
  const sec=document.createElement("section"); sec.className="volume-group";
  sec.innerHTML=`<h2>${label}</h2><div class="document-grid"></div>`;
  const grid=sec.querySelector(".document-grid");
  items.sort((a,b)=>a.part-b.part).forEach(d=>{
   const card=document.createElement("article"); card.className="document-card";
   card.innerHTML=`<div class="meta"><span>${d.volume}권 ${d.part}부</span><span>공개</span></div>
   <h3>${esc(d.title)}</h3><p>${esc(d.filename)}</p>
   <dl><div><dt>장</dt><dd>${d.chapters}</dd></div><div><dt>화</dt><dd>${d.episodes}</dd></div>
   <div><dt>글자</dt><dd>${d.characters.toLocaleString()}</dd></div><div><dt>문단</dt><dd>${d.paragraphs.toLocaleString()}</dd></div></dl>
   <div class="actions"><a class="primary" href="./viewer.html?id=${encodeURIComponent(d.id)}">읽기</a>
   <a href="${d.path}" download>MD 다운로드</a></div>`;
   grid.appendChild(card);
  });
  list.appendChild(sec);
 });
}
fetch("../../story/manuscript/manifest.json").then(r=>r.json()).then(x=>{docs=x.documents||[];render()})
.catch(()=>list.innerHTML='<p class="error-box">원본 목록을 불러오지 못했습니다.</p>');
search.addEventListener("input",render);status.addEventListener("change",render);
