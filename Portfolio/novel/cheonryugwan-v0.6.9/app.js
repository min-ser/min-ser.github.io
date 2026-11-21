'use strict';
const main=document.querySelector('#main');
const EMBLEMS={orthodox:'assets/orthodox-crest.webp',unorthodox:'assets/unorthodox-crest.webp',demonic:'assets/demonic-crest.webp'};
const factions=[['정파','正','정통 무학과 학관의 질서','orthodox'],['사파','邪','자유로운 경쟁과 서로 다른 무학','unorthodox'],['마교','魔','특이점과 끝없는 무학 탐구','demonic']];
const bookmarkKey=path=>'crg-read-v1:'+path;
function savedPage(path){try{return Math.max(0,Number(localStorage.getItem(bookmarkKey(path)))||0)}catch{return 0}}
function savePage(){if(!selected||!bookOpened)return;try{localStorage.setItem(bookmarkKey(selected),String(bookPage))}catch{}}
let page='home',tab='novel',selected='',docs=[],status='loading',sourceRevision='',readerSize=16,readerSpacing=2.4,readerTheme='paper',motionEnabled=localStorage.getItem('crg-motion')!=='off',transitioning=false,bookPage=0,bookOpened=false,bookPages=[];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr=s=>esc(s);
const heading=(t,d)=>`<div class="title"><small>天流館 · NOVEL ARCHIVE</small><h2>${esc(t)}</h2></div><p class="intro">${esc(d)}</p>`;
const entry=(d)=>`<button class="archive-entry" data-doc="${attr(d.path)}">${d.kind==='novel'?`<img class="entry-cover" src="${attr(coverFor(d))}" alt="" loading="lazy">`:''}<small>${esc(d.path)}</small><strong>${esc(d.title)}</strong><span>문서 읽기 ❯</span></button>`;
const list=(arr)=>arr.length?arr.map(entry).join(''):'<div class="notice">현재 공개된 문서가 없습니다. 원본 저장소와 콘텐츠 빌드 결과를 확인하세요.</div>';
const coverFor=d=>safeImage(d.cover)||'assets/academy.webp';
const safeImage=u=>typeof u==='string'&&(/^(assets\/|https:\/\/)/i.test(u))&&!/[\s"'<>]/.test(u)?u:'';
const resolveImage=(raw,doc)=>{let u=String(raw||'').trim();if(/^https:\/\//i.test(u))return safeImage(u);if(/^assets\//.test(u))return safeImage(u);if(/^03_ASSETS\//.test(u))return 'assets/archive/'+u.slice('03_ASSETS/'.length);if(/^\.\.\//.test(u)||u.startsWith('/'))return '';if(/^chapter-[0-9]+\//.test(u))return 'assets/archive/NOVEL/'+doc.part+'/'+u;if(/^scene-[0-9]+\./.test(u)||u==='cover.webp')return 'assets/archive/NOVEL/'+doc.part+'/'+doc.path.split('/').pop().replace(/\.md$/,'')+'/'+u;return ''};
const motionAllowed=()=>motionEnabled&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const chapters=()=>docs.filter(d=>d.kind==='novel').sort((a,b)=>a.path.localeCompare(b.path,undefined,{numeric:true}));
const canon=()=>docs.filter(d=>d.kind==='canon');
const filterPath=(prefix)=>canon().filter(d=>d.path.startsWith(prefix));
const section=(t,desc,items)=>`<div class="page">${heading(t,desc)}<div class="archive-list">${list(items)}</div></div>`;

const DESIGN_SHEETS=[
  ['novel-library','소설 목록 · 작품 소개','회차 탐색, 작품 표지, 읽기 시작 동선'],
  ['reader-main','고서형 리더 · 본문','한지 질감과 좌우 두 쪽, 이미지와 본문의 균형'],
  ['reader-controls','고서형 리더 · 목차 및 설정','목차와 읽기 설정을 펼친 상태의 목표 배치'],
  ['reader-cover','고서형 리더 · 표지와 두 쪽','책 표지, 책등, 페이지 번호, 독서 도구'],
  ['reader-blank','고서형 리더 · 한지와 장정','문자 없는 고서의 종이 질감과 장식 기준'],
  ['world-atlas','세계관 · 무학','세력 지도, 문서 탐색, 정보 패널']
];
function designGallery(){return `<div class="page design-page">${heading('목표 디자인 아카이브','디자인 참고 시안입니다. 실제 원고나 현재 구현 화면이 아닙니다.')}<div class="notice">시안 속 회차 제목·문장·세력 지도는 시각적 예시이며 실제 NOVEL 원고 및 확정 설정을 대체하지 않습니다.</div><div class="design-gallery">${DESIGN_SHEETS.map(([slug,title,desc],i)=>`<figure class="design-sheet"><button class="design-image-button" data-design="${slug}" aria-label="${esc(title)} 크게 보기"><img src="assets/design/${slug}.png" alt="${esc(title)} 목표 디자인 시안" loading="${i===0?'eager':'lazy'}"></button><figcaption><strong>${esc(title)}</strong><span>${esc(desc)}</span><small>DESIGN REFERENCE · ${String(i+1).padStart(2,'0')}</small></figcaption></figure>`).join('')}</div></div>`}
function openDesign(slug){if(!DESIGN_SHEETS.some(d=>d[0]===slug))return;const d=document.createElement('dialog');d.className='design-dialog';d.innerHTML=`<div class="design-dialog-head"><strong>${esc(DESIGN_SHEETS.find(x=>x[0]===slug)[1])}</strong><button type="button" data-close-design aria-label="닫기">✕ 닫기</button></div><img src="assets/design/${slug}.png" alt="${esc(DESIGN_SHEETS.find(x=>x[0]===slug)[1])} 디자인 시안"><p>목표 디자인 시안 · 실제 웹 구현 화면이 아닙니다.</p>`;document.body.append(d);d.addEventListener('click',e=>{if(e.target===d||e.target.closest('[data-close-design]'))d.close()});d.addEventListener('close',()=>d.remove(),{once:true});d.showModal()}

function home(){let recent=chapters().slice(-5).reverse();return `<section class="hero"><div class="backdrop"></div><div class="midground"></div><div class="foreground" aria-hidden="true"></div><div class="orn-mist" aria-hidden="true"></div><div class="orn-lattice" aria-hidden="true"></div><div class="orn-plum" aria-hidden="true"></div><div class="orn-corner" aria-hidden="true"></div><div class="orn-corner right" aria-hidden="true"></div><img class="hero-character" src="assets/jeon-seoyul-stand.webp" alt="전서율 콘셉트 일러스트"><div class="hero-character-caption"><b>전서율</b>학관 입문편</div><div class="hero-content"><div class="eyebrow">THE REVISED CHRONICLES</div><h1>천류관</h1><div class="hanja">天 流 館</div><p>검을 쥐는 법조차 알지 못했던 이방인.<br>정파 학관에서 시작된 작은 발걸음이<br>무림의 경계를 넘어선다.</p><button class="btn" data-go="novel">실제 원고 읽기 ❯</button><button class="btn alt" data-go="canon">통합 설정집 ❯</button></div></section><div class="section">${heading('천류관의 기록','원고와 설정을 GitHub Novel Archive에서 불러옵니다')}<div class="feature-illustrated">${[['NOVEL','소설 본편','학관편 실제 원고','novel'],['CHARACTERS','캐릭터 도감','인물별 상세 기록','characters'],['WORLD','세계관 · 무학','정 · 사 · 마의 세력','world'],['ARCHIVE','통합 설정집','확정 설정 문서','canon']].map(x=>`<button class="feature-card" data-go="${x[3]}"><span class="feature-art" aria-hidden="true"></span><span class="feature-label"><small>${x[0]}</small><strong>${x[1]}</strong><span>${x[2]} ❯</span></span></button>`).join('')}</div><div style="margin-top:42px">${heading('무림의 세 가지 길','정 · 사 · 마')}</div><div class="sects">${factions.map((f,i)=>`<button class="sect ${i===1?'sa':i===2?'ma':''}" data-go="world"><img src="${EMBLEMS[f[3]]}" alt="${f[0]} 문양"><strong>${f[0]} · ${f[1]}</strong><p>${f[2]}</p></button>`).join('')}</div><div style="margin-top:40px">${heading('최신 원고','아카이브에서 읽어온 학관편 회차')}</div><div class="archive-list">${list(recent)}</div><div class="design-home-link"><button class="btn alt" data-go="design">목표 디자인 시안 6종 살펴보기 ❯</button><p>시안은 참고 이미지이며 실제 소설 본문과 분리되어 있습니다.</p></div><div class="notice">콘텐츠 출처: min-ser/NOVEL · master · ${esc(sourceRevision.slice(0,10))}</div></div>`}
function novel(){let parts=['PART_01_ACADEMY','PART_02','PART_03','PART_04'];return `<div class="page">${heading('소설 본편','01_NOVEL · 정식 원고만 공개')}<div class="part-tabs">${parts.map((p,i)=>`<button class="${tab===p?'selected':''}" data-part="${p}">${i+1}부</button>`).join('')}</div><div class="archive-list">${list(chapters().filter(d=>d.part===(parts.includes(tab)?tab:parts[0])))}</div></div>`}
function world(){return `<div class="page">${heading('세계관·무학','02_CANON/WORLD · 02_CANON/MARTIAL_ARTS')}<div class="sects">${factions.map((f,i)=>`<div class="sect ${i===1?'sa':i===2?'ma':''}"><img src="${EMBLEMS[f[3]]}" alt="${f[0]} 문양"><strong>${f[0]}</strong><p>${f[2]}</p></div>`).join('')}</div><div class="archive-list">${list([...filterPath('02_CANON/WORLD/'),...filterPath('02_CANON/MARTIAL_ARTS/')])}</div></div>`}
function markdown(md,doc={part:"",path:""}){
  const lines=String(md).replace(/\r\n/g,'\n').split('\n');let html='',listType='',inCode=false,table=[];
  const inline=t=>{
    let out=esc(t);
    out=out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(_,alt,url)=>{let u=resolveImage(url,doc);if(!u)return esc(alt);return `<figure class="story-figure"><button type="button" class="illustration-zoom" data-zoom="${attr(u)}" data-alt="${attr(alt)}" aria-label="삽화 확대: ${attr(alt)}"><img loading="lazy" src="${attr(u)}" alt="${attr(alt)}"></button>${alt?`<figcaption>${esc(alt)}</figcaption>`:""}</figure>`});
    out=out.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,(_,label,url)=>`<a href="${attr(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`);
    return out.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
  };
  const closeList=()=>{if(listType){html+=`</${listType}>`;listType=''}};
  const flushTable=()=>{if(!table.length)return;let rows=table.filter(l=>!/^\s*\|?\s*:?-{3,}/.test(l));html+='<div class="table-scroll"><table>'+rows.map((r,i)=>'<tr>'+r.trim().replace(/^\||\|$/g,'').split('|').map(c=>`<${i?'td':'th'}>${inline(c.trim())}</${i?'td':'th'}>`).join('')+'</tr>').join('')+'</table></div>';table=[]};
  for(const line of lines){
    if(/^```/.test(line)){flushTable();closeList();html+=inCode?'</code></pre>':'<pre><code>';inCode=!inCode;continue}
    if(inCode){html+=esc(line)+'\n';continue}
    if(/^\s*\|.*\|\s*$/.test(line)){closeList();table.push(line);continue}flushTable();
    const h=line.match(/^(#{1,6})\s+(.+)/),bullet=line.match(/^\s*[-*]\s+(.+)/),num=line.match(/^\s*\d+\.\s+(.+)/);
    if(h){closeList();let n=h[1].length;html+=`<h${n}>${inline(h[2])}</h${n}>`}
    else if(bullet||num){let kind=bullet?'ul':'ol';if(listType!==kind){closeList();html+=`<${kind}>`;listType=kind}html+=`<li>${inline((bullet||num)[1])}</li>`}
    else if(/^>\s?/.test(line)){closeList();html+=`<blockquote>${inline(line.replace(/^>\s?/,''))}</blockquote>`}
    else {closeList();if(line.trim())html+=`<p>${inline(line)}</p>`}
  }
  flushTable();closeList();if(inCode)html+='</code></pre>';return html;
}
function reader(){
 const d=docs.find(x=>x.path===selected);if(!d)return section('문서를 찾을 수 없습니다','원고 동기화를 확인하세요',[]);
 if(d.kind!=='novel')return `<div class="page reader-page">${heading(d.title,d.path)}<div class="book archive-reader ${readerTheme}"><button data-go="canon">← 목록</button><article>${markdown(d.body,d)}</article></div></div>`;
 const all=chapters().filter(x=>x.part===d.part),i=all.findIndex(x=>x.path===d.path),cover=safeImage(d.cover);
 return `<section class="immersive-reader" aria-label="${attr(d.title)} 독서 화면">
  <div class="reader-top"><button data-go="novel" aria-label="회차 목록으로 돌아가기">← 목차</button><span class="reader-chapter-name">${esc(d.title)}</span><div class="reader-settings"><label>글자 <input id="fontSize" aria-label="글자 크기" type="range" min="13" max="23" value="${readerSize}"></label><button data-motion="toggle" aria-pressed="${motionEnabled}">효과 ${motionEnabled?'ON':'OFF'}</button></div></div>
  <div class="reading-stage">
   <div class="antique-book ${bookOpened?'opened':'closed'} ${readerTheme}" id="antiqueBook">
    <div class="book-cover-face" id="bookCover"><div class="cover-emblem">天流館</div><div class="cover-ornament">❖ ─── ✦ ─── ❖</div><div class="cover-book-title">${esc(d.title)}</div><div class="cover-subtitle">천류관 · 소설 본편</div><button class="open-book-button" data-open-book>책 펼치기 <span aria-hidden="true">❯</span></button></div>
    <div class="book-spread" id="bookSpread" ${bookOpened?'':'hidden'}><div class="book-leaf left-leaf"><div class="leaf-content" id="leftPage"></div><div class="leaf-number" id="leftNumber"></div></div><div class="book-leaf right-leaf"><div class="leaf-content" id="rightPage"></div><div class="leaf-number" id="rightNumber"></div></div><div class="book-spine"></div><div class="book-flip-sheet" aria-hidden="true"></div></div>
    <div class="chapter-vision" id="chapterVision" aria-hidden="true">${cover?`<img src="${attr(cover)}" alt="">`:''}<div class="vision-title">${esc(d.title)}</div></div>
   </div>
  </div>
  <div class="reader-bottom"><button id="prevSpread" data-spread="prev" aria-label="이전 두 페이지">❮ 이전</button><span class="reader-progress-wrap"><span id="readingProgress" aria-live="polite">${bookOpened?'페이지 준비 중':'표지를 눌러 책을 펼치세요'}</span><button id="nextSpread" data-spread="next" aria-label="다음 두 페이지">다음 ❯</button></div>
  <div id="chapterMarkdown" hidden>${markdown(d.body,d)}</div>
  <div id="chapterLinks" hidden data-previous="${i>0?attr(all[i-1].path):''}" data-next="${i>=0&&i<all.length-1?attr(all[i+1].path):''}"></div>
 </section>`;
}
// Pagination must measure a hidden probe rather than mutating the visible page.
// The content block identity is retained so a font/viewport change can restore position.
function paginationProbe(){
 const leaf=document.querySelector('.left-leaf');if(!leaf)return null;
 let probe=document.querySelector('#paginationProbe');if(probe)return probe;
 probe=document.createElement('div');probe.id='paginationProbe';probe.className='leaf-content';
 probe.setAttribute('aria-hidden','true');
 Object.assign(probe.style,{position:'absolute',visibility:'hidden',pointerEvents:'none',overflow:'hidden',left:'0',top:'0',zIndex:'-1'});
 leaf.append(probe);return probe;
}
function measurePage(items){
 const probe=paginationProbe(),visible=document.querySelector('#leftPage');if(!probe||!visible)return true;
 const rect=visible.getBoundingClientRect();
 probe.style.width=rect.width+'px';probe.style.height=rect.height+'px';
 probe.replaceChildren(...items.map(n=>n.cloneNode(true)));
 return probe.scrollHeight<=probe.clientHeight+1;
}
function splitParagraph(node){
 if(node.tagName!=='P'||node.children.length||!node.textContent.trim())return [node.cloneNode(true)];
 if(measurePage([node]))return [node.cloneNode(true)];
 const result=[];let rest=node.textContent;
 while(rest.length){
  let lo=1,hi=rest.length,best=0;
  while(lo<=hi){const mid=Math.floor((lo+hi)/2);const p=document.createElement('p');p.textContent=rest.slice(0,mid);if(measurePage([p])){best=mid;lo=mid+1}else hi=mid-1}
  if(best===0){console.warn('Reader viewport too small to fit a single character');break}
  let cut=best;
  if(best<rest.length){const candidates=[' ','\n','。','!','?','.'].map(ch=>rest.lastIndexOf(ch,best-1));const boundary=Math.max(...candidates);if(boundary>best*.6)cut=boundary+1}
  const p=document.createElement('p');p.textContent=rest.slice(0,cut);result.push(p);rest=rest.slice(cut);
 }
 return result.length?result:[node.cloneNode(true)];
}
function paginateBook(){
 const source=document.querySelector('#chapterMarkdown'),left=document.querySelector('#leftPage');if(!source||!left)return;
 const anchor=bookPages[bookPage]?.[0]?.dataset?.sourceIndex;
 const pages=[];let current=[];const append=node=>{
  if(measurePage([...current,node])){current.push(node);return}
  if(current.length){pages.push(current);current=[]}
  if(measurePage([node])){current=[node];return}
  // An oversized image/table/code block is kept intact and flagged instead of silently clipped.
  node.classList.add('reader-oversize');current=[node];pages.push(current);current=[];
 };
 [...source.children].forEach((node,index)=>{
  for(const fragment of splitParagraph(node)){fragment.dataset.sourceIndex=String(index);append(fragment)}
 });
 if(current.length)pages.push(current);
 bookPages=pages.length?pages:[[]];
 if(anchor!==undefined){const idx=bookPages.findIndex(nodes=>nodes.some(n=>n.dataset.sourceIndex===anchor));bookPage=idx<0?0:Math.floor(idx/2)*2}
 bookPage=Math.min(bookPage,Math.floor((bookPages.length-1)/2)*2);
 showSpread();
}
function showSpread(){const l=document.querySelector('#leftPage'),r=document.querySelector('#rightPage');if(!l||!r)return;l.replaceChildren(...(bookPages[bookPage]||[]).map(n=>n.cloneNode(true)));r.replaceChildren(...(bookPages[bookPage+1]||[]).map(n=>n.cloneNode(true)));document.querySelector('#leftNumber').textContent=bookPage+1;document.querySelector('#rightNumber').textContent=bookPage+2<=bookPages.length?bookPage+2:'';document.querySelector('#readingProgress').textContent=`${Math.min(bookPage+2,bookPages.length)} / ${bookPages.length}쪽`;document.querySelector('#prevSpread').disabled=bookPage===0;document.querySelector('#nextSpread').textContent=bookPage+2>=bookPages.length?'다음 회차 ❯':'다음 ❯';savePage()}
function openBook(){if(bookOpened)return;bookOpened=true;const book=document.querySelector('#antiqueBook');book.classList.remove('closed');book.classList.add('opened');document.querySelector('#bookSpread').hidden=false;const resumeAt=savedPage(selected);paginateBook();bookPage=Math.min(Math.floor(resumeAt/2)*2,Math.floor((bookPages.length-1)/2)*2);showSpread();if(motionAllowed()){book.classList.add('opening');const vision=document.querySelector('#chapterVision');vision.classList.add('visible');setTimeout(()=>{vision.classList.remove('visible');book.classList.remove('opening')},2200)}}
function flipSpread(dir){if(transitioning)return;const next=bookPage+dir*2;if(next<0){const path=document.querySelector('#chapterLinks')?.dataset.previous;if(path)turnChapter(path);return}if(next>=bookPages.length){const path=document.querySelector('#chapterLinks')?.dataset.next;if(path)turnChapter(path);return}const book=document.querySelector('#antiqueBook');if(!motionAllowed()){bookPage=next;showSpread();return}transitioning=true;book.classList.add(dir>0?'flipping-next':'flipping-prev');setTimeout(()=>{bookPage=next;showSpread()},340);setTimeout(()=>{book.classList.remove('flipping-next','flipping-prev');transitioning=false},700)}
function turnChapter(path){if(transitioning)return;savePage();bookOpened=false;bookPage=0;bookPages=[];navigate('reader',path)}
function openIllustration(src,alt){const dialog=document.createElement('dialog');dialog.className='illustration-dialog';dialog.innerHTML=`<button class="close-illustration" aria-label="이미지 닫기">✕ 닫기</button><img src="${attr(src)}" alt="${attr(alt)}"><p>${esc(alt)}</p>`;document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog||e.target.closest('.close-illustration'))dialog.close()});dialog.addEventListener('close',()=>dialog.remove(),{once:true});dialog.showModal()}
function render(){let out=status==='loading'?section('콘텐츠 불러오는 중','content.json을 확인하고 있습니다',[]):status==='error'?`<div class="page">${heading('콘텐츠를 불러오지 못했습니다','content.json 생성 또는 배포 경로를 확인하세요')}<div class="notice">NOVEL 원본 저장소 동기화에 실패했습니다. Git 접근 권한 및 네트워크를 확인하세요. 예시 원고는 실제 프로젝트에 표시하지 않습니다.</div></div>`:page==='home'?home():page==='design'?designGallery():page==='novel'?novel():page==='characters'?section('캐릭터 설정','02_CANON/CHARACTERS',filterPath('02_CANON/CHARACTERS/')):page==='relationships'?section('관계·감정','02_CANON/CHARACTERS/RELATIONSHIPS',filterPath('02_CANON/CHARACTERS/RELATIONSHIPS/')):page==='costumes'?section('의상·일러스트','02_CANON/CHARACTERS/COSTUMES',filterPath('02_CANON/CHARACTERS/COSTUMES/')):page==='world'?world():page==='canon'?section('통합 설정집','02_CANON/MASTER_REFERENCE.md',canon().filter(d=>d.path==='02_CANON/MASTER_REFERENCE.md'||d.path==='02_CANON/CANON_INDEX.md')):page==='history'?`<div class="page">${heading('개정 기록','04_ARCHIVE는 기본적으로 공개 빌드에서 제외됩니다')}<div class="notice">과거 원본 및 폐기 자료는 공개 정책 확정 후 별도로 제공할 수 있습니다. 현재는 정식 원고와 확정 설정만 게시합니다.</div></div>`:page==='reader'?reader():home();main.innerHTML=out;document.body.classList.toggle('reading-mode',page==='reader'&&docs.find(x=>x.path===selected)?.kind==='novel');if(page==='reader'&&bookOpened)requestAnimationFrame(()=>paginateBook());document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.go===page))}
function navigate(p,doc){savePage();page=p;if(doc!==undefined){if(selected!==doc){bookOpened=false;bookPage=0;bookPages=[]}selected=doc}else{selected='';bookOpened=false;bookPage=0;bookPages=[]}history.pushState({page,selected},'',`#${encodeURIComponent(page)}${selected&&page==='reader'?'?doc='+encodeURIComponent(selected):''}`);render();window.scrollTo(0,0)}
document.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;if(b.dataset.design)openDesign(b.dataset.design);else if(b.dataset.openBook!==undefined)openBook();else if(b.dataset.spread)flipSpread(b.dataset.spread==='next'?1:-1);else if(b.dataset.doc!==undefined)page==='reader'?turnChapter(b.dataset.doc):navigate('reader',b.dataset.doc);else if(b.dataset.go)navigate(b.dataset.go);else if(b.dataset.part){tab=b.dataset.part;render()}else if(b.dataset.theme){readerTheme=readerTheme==='paper'?'dark':'paper';render()}else if(b.dataset.restart!==undefined){try{localStorage.removeItem(bookmarkKey(selected))}catch{}bookPage=0;if(bookOpened)showSpread()}else if(b.dataset.motion){motionEnabled=!motionEnabled;localStorage.setItem('crg-motion',motionEnabled?'on':'off');b.textContent='효과 '+(motionEnabled?'ON':'OFF');b.setAttribute('aria-pressed',String(motionEnabled))}else if(b.dataset.zoom){openIllustration(b.dataset.zoom,b.dataset.alt||'삽화')}});
document.addEventListener('input',e=>{if(e.target.id==='fontSize'){readerSize=Number(e.target.value);document.querySelector('.immersive-reader')?.style.setProperty('--reader-size',readerSize+'px');if(bookOpened)requestAnimationFrame(paginateBook)}if(e.target.id==='lineSpacing'){readerSpacing=Number(e.target.value)/10;document.querySelector('.archive-reader')?.style.setProperty('--reader-spacing',readerSpacing)}});
let resizeFrame=0;window.addEventListener('resize',()=>{if(bookOpened){cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(paginateBook)}});document.addEventListener('load',e=>{if(bookOpened&&e.target.matches?.('.leaf-content img'))paginateBook()},true);document.addEventListener('keydown',e=>{if(page!=='reader'||!bookOpened||e.target.closest('input,textarea,dialog'))return;if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();flipSpread(1)}else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();flipSpread(-1)}});window.addEventListener('popstate',()=>{readHash();render()});
function readHash(){let hash=decodeURIComponent(location.hash.slice(1));let split=hash.indexOf('?doc=');page=split>=0?hash.slice(0,split):hash||'home';selected=split>=0?hash.slice(split+5):''}
readHash();render();
fetch('./content.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{if(!Array.isArray(data.items))throw Error('Invalid manifest');if(data.source==='demo-preview'||data.revision==='SAMPLE-CONTENT-NOT-SYNCED')throw Error('Demo content prohibited in production');if(data.syncStatus==='failed'||data.syncStatus==='not_synced'||data.revision==='SYNC_FAILED'||data.revision==='NOT_SYNCED'||!data.items.some(d=>d.kind==='novel'))throw Error('NOVEL content was not synchronized: '+(data.message||data.revision));docs=data.items.filter(d=>d&&typeof d.path==='string'&&typeof d.body==='string'&&['novel','canon'].includes(d.kind));sourceRevision=data.revision||'';status='ready';render()}).catch(err=>{console.error('Novel Archive content load failed',err);status='error';render()});
