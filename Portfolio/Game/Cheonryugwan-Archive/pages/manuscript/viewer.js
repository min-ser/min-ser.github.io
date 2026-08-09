
const params=new URLSearchParams(location.search), id=params.get("id");
const article=document.querySelector("#article"),toc=document.querySelector("#toc");
let raw="",doc=null,font=+(localStorage.getItem("reader-font")||1),line=+(localStorage.getItem("reader-line")||1.8),hits=[],hit=-1;
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const inline=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`(.+?)`/g,"<code>$1</code>");
function md(text){
 let out=[],para=[],ul=false,n=0;
 const fp=()=>{if(para.length){out.push(`<p>${inline(para.join(" "))}</p>`);para=[]}};
 const cl=()=>{if(ul){out.push("</ul>");ul=false}};
 text.replace(/\r\n/g,"\n").split("\n").forEach(l=>{
  let h=l.match(/^(#{1,6})\s+(.+)$/),li=l.match(/^\s*[-*]\s+(.+)$/),q=l.match(/^>\s?(.*)$/);
  if(h){fp();cl();let lv=h[1].length,s=`sec-${n++}`;out.push(`<h${lv} id="${s}">${inline(h[2])}</h${lv}>`)}
  else if(li){fp();if(!ul){out.push("<ul>");ul=true}out.push(`<li>${inline(li[1])}</li>`)}
  else if(q){fp();cl();out.push(`<blockquote>${inline(q[1])}</blockquote>`)}
  else if(/^---+$/.test(l.trim())){fp();cl();out.push("<hr>")}
  else if(!l.trim()){fp();cl()}else para.push(l.trim());
 });fp();cl();return out.join("\n");
}
function settings(){article.style.setProperty("--scale",font);article.style.setProperty("--line",line)}
function buildToc(){toc.innerHTML="";article.querySelectorAll("h1,h2,h3").forEach(h=>{let a=document.createElement("a");a.href=`#${h.id}`;a.textContent=h.textContent;a.className=`l${h.tagName[1]}`;a.onclick=e=>{e.preventDefault();h.scrollIntoView({behavior:"smooth"})};toc.appendChild(a)})}
function nav(docs,i){for(const [el,d,dir] of [[document.querySelector("#prev-doc"),docs[i-1],"← "],[document.querySelector("#next-doc"),docs[i+1],""]]){if(d){el.hidden=false;el.href=`./viewer.html?id=${d.id}`;el.textContent=dir+`${d.volume}권 ${d.part}부`+(dir?"":" →")}else el.hidden=true}}
fetch("../../story/manuscript/manifest.json").then(r=>r.json()).then(async m=>{
 const docs=(m.documents||[]).filter(d=>d.status==="published");let i=docs.findIndex(d=>d.id===id);if(i<0)i=0;doc=docs[i];
 const r=await fetch(doc.path);raw=await r.text();document.title=`${doc.title} | 천류관`;article.innerHTML=md(raw);settings();buildToc();nav(docs,i);
 requestAnimationFrame(()=>scrollTo(0,+(localStorage.getItem(`reader:${doc.id}`)||0)));
}).catch(()=>article.innerHTML='<p class="error-box">문서를 불러오지 못했습니다.</p>');
document.querySelector("#font-up").onclick=()=>{font=Math.min(1.5,font+.1);localStorage.setItem("reader-font",font);settings()};
document.querySelector("#font-down").onclick=()=>{font=Math.max(.8,font-.1);localStorage.setItem("reader-font",font);settings()};
document.querySelector("#line-toggle").onclick=()=>{line=line>=2.2?1.6:line+.2;localStorage.setItem("reader-line",line);settings()};
document.querySelector("#theme-toggle").onclick=()=>{document.body.classList.toggle("reader-light");document.body.classList.toggle("reader-dark")};
document.querySelector("#toc-toggle").onclick=()=>document.querySelector("#toc-panel").classList.toggle("collapsed");
document.querySelector("#download-md").onclick=()=>{let b=new Blob([raw],{type:"text/markdown"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=doc.filename;a.click();URL.revokeObjectURL(a.href)};
document.querySelector("#to-top").onclick=()=>scrollTo({top:0,behavior:"smooth"});
function clear(){article.querySelectorAll("mark").forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));article.normalize()}
function find(){clear();hits=[];hit=-1;let q=document.querySelector("#search-input").value.trim();if(!q){document.querySelector("#search-count").textContent="0/0";return}
 let w=document.createTreeWalker(article,NodeFilter.SHOW_TEXT),nodes=[];while(w.nextNode())nodes.push(w.currentNode);
 nodes.forEach(n=>{let t=n.nodeValue,l=t.toLowerCase(),qq=q.toLowerCase(),s=0,f=document.createDocumentFragment(),ok=false,i;
  while((i=l.indexOf(qq,s))>=0){ok=true;f.append(t.slice(s,i));let m=document.createElement("mark");m.textContent=t.slice(i,i+q.length);f.append(m);hits.push(m);s=i+q.length}
  if(ok){f.append(t.slice(s));n.replaceWith(f)}});if(hits.length){hit=0;focus()}else document.querySelector("#search-count").textContent="0/0"}
function focus(){hits.forEach((m,i)=>m.classList.toggle("active",i===hit));hits[hit]?.scrollIntoView({behavior:"smooth",block:"center"});document.querySelector("#search-count").textContent=hits.length?`${hit+1}/${hits.length}`:"0/0"}
document.querySelector("#search-input").oninput=find;
document.querySelector("#search-next").onclick=()=>{if(hits.length){hit=(hit+1)%hits.length;focus()}};
document.querySelector("#search-prev").onclick=()=>{if(hits.length){hit=(hit-1+hits.length)%hits.length;focus()}};
addEventListener("scroll",()=>{let max=document.documentElement.scrollHeight-innerHeight,rate=max?scrollY/max:0;document.querySelector("#progress").style.width=`${rate*100}%`;if(doc)localStorage.setItem(`reader:${doc.id}`,scrollY);document.querySelector("#to-top").classList.toggle("show",scrollY>500)});
