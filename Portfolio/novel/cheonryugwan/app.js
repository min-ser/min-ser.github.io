'use strict';
const main=document.querySelector('#main');
const EMBLEMS={orthodox:'assets/orthodox-crest.webp',unorthodox:'assets/unorthodox-crest.webp',demonic:'assets/demonic-crest.webp'};
const factions=[['정파','正','정통 무학과 학관의 질서','orthodox'],['사파','邪','자유로운 경쟁과 서로 다른 무학','unorthodox'],['마교','魔','특이점과 끝없는 무학 탐구','demonic']];
const bookmarkKey=path=>'crg-read-v1:'+path;
function savedPage(path){try{return Math.max(0,Number(localStorage.getItem(bookmarkKey(path)))||0)}catch{return 0}}
function savePage(){if(!selected||!bookOpened)return;try{localStorage.setItem(bookmarkKey(selected),String(bookPage))}catch{}}
let worldTab='factions',worldFaction='all',worldQuery='';
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


// Character atlas: populated exclusively from published 02_CANON character documents.
let characterQuery='';
let activeCharacter='';
let portraitManifest={};
let relationshipFocus='';
let galleryFocus='all';
let galleryFilter='all';
let galleryManifest={};
let publishedAssets=[];
let assetQuery='';
let assetExpanded=false;
let assetType='all';
let assetSort='name';
let assetCompare=[]; // Up to two manually selected published assets; no automatic character attribution.
let mappingCandidate='',mappingPerson='',mappingType='stand',mappingLabel='';
const mappingPreview=()=>{const person=characterDocs().find(d=>d.path===mappingPerson);const asset=publishedAssets.find(a=>a.url===mappingCandidate&&safeGalleryPath(a.url));if(!person||!asset)return '';return JSON.stringify({character:person.path,image:asset.url,type:mappingType,label:mappingLabel.trim()||'공식 이미지'},null,2)};
const compareAsset=u=>publishedAssets.find(a=>a&&a.url===u&&safeGalleryPath(a.url));
const characterDocs=()=>canon().filter(d=>/^02_CANON\/CHARACTERS\//.test(d.path)&&!/\/(RELATIONSHIPS|COSTUMES)\//i.test(d.path));
const safeGalleryPath=u=>typeof u==='string'&&/^assets\/[a-zA-Z0-9_./-]+\.(webp|png|jpg|jpeg|avif)$/i.test(u)&&!u.includes('..')?u:'';
const galleryImagesFor=d=>{
 const mapped=galleryManifest[d.path];
 const entries=Array.isArray(mapped)?mapped:[];
 const explicit=entries.filter(e=>e&&typeof e==='object').map(e=>({url:safeGalleryPath(e.url),label:String(e.label||'공식 이미지').slice(0,70),type:['stand','battle','outfit','expression','event'].includes(e.type)?e.type:'outfit'})).filter(e=>e.url);
 const portrait=characterPortrait(d);
 return [...(portrait?[{url:portrait,label:'대표 이미지',type:'stand'}]:[]),...explicit].filter((e,i,a)=>a.findIndex(x=>x.url===e.url)===i);
};
const galleryTypes=[['all','전체'],['stand','기본'],['battle','전투'],['outfit','의상'],['expression','표정'],['event','이벤트']];
function characterGallery(){
 const people=characterDocs();
 const selected=people.find(d=>d.path===galleryFocus)||null;
 const candidates=selected?[selected]:people;
 const entries=candidates.flatMap(d=>galleryImagesFor(d).map(img=>({...img,person:d})));
 const visible=entries.filter(x=>galleryFilter==='all'||x.type===galleryFilter);
 const records=filterPath('02_CANON/CHARACTERS/COSTUMES/');
 const registered=people.filter(d=>galleryImagesFor(d).length>0).length;
 const totalImages=people.reduce((n,d)=>n+galleryImagesFor(d).length,0);
 const missing=people.filter(d=>galleryImagesFor(d).length===0);
 const assetVisible=publishedAssets.filter(a=>a&&safeGalleryPath(a.url)&&String(a.path||'').toLocaleLowerCase().includes(assetQuery.toLocaleLowerCase())&&(assetType==='all'||a.url.toLowerCase().endsWith('.'+assetType))).sort((a,b)=>assetSort==='size'?(b.bytes||0)-(a.bytes||0):String(a.path).localeCompare(String(b.path),'ko'));
 return `<div class="page costume-gallery"><div class="edition-inner-hero edition-inner-hero-art"><small>VISUAL ARCHIVE · 天流館</small><h1>무림의 화첩</h1><p>인물의 얼굴과 의상, 그림으로 남겨진 이야기.</p><span>승인된 공식 이미지와 공개 자산만 표시합니다.</span></div>
 <div class="gallery-intro"><span>CHARACTER VISUAL ARCHIVE</span><strong>천류관 인물의 기록을, 한 장의 그림으로.</strong><p>기본 · 전투 · 의상 · 표정 · 이벤트 이미지를 인물별로 탐색할 수 있습니다.</p></div>
 <div class="gallery-audit" aria-label="공식 일러스트 등록 현황"><div><small>등록 인물</small><strong>${registered}<span> / ${people.length}</span></strong></div><div><small>연결 이미지</small><strong>${totalImages}<span>장</span></strong></div><div><small>이미지 미등록</small><strong>${missing.length}<span>명</span></strong></div></div>
 ${missing.length?`<details class="gallery-missing"><summary>공식 이미지 미등록 인물 ${missing.length}명 확인</summary><p>이미지 매핑이 없는 인물입니다. 임의 이미지를 대신 표시하지 않습니다.</p><div>${missing.map(d=>`<button data-character="${attr(d.path)}">${esc(d.title)} ❯</button>`).join('')}</div></details>`:''}
 <div class="gallery-controls"><label>인물 선택<select id="gallery-person"><option value="all" ${!selected?'selected':''}>전체 인물</option>${people.map(d=>`<option value="${attr(d.path)}" ${selected?.path===d.path?'selected':''}>${esc(d.title)}</option>`).join('')}</select></label><div class="gallery-filters" role="group" aria-label="이미지 유형">${galleryTypes.map(([key,title])=>`<button data-gallery-filter="${key}" class="${galleryFilter===key?'selected':''}" aria-pressed="${galleryFilter===key}">${title}</button>`).join('')}</div></div>
 <div class="gallery-count">등록된 이미지 ${visible.length}장 <span>· 공개 설정 문서 ${people.length}건</span></div>
 ${visible.length?`<div class="gallery-grid">${visible.map((x,i)=>`<article class="gallery-tile"><button data-zoom="${attr(x.url)}" data-alt="${attr(x.person.title+' · '+x.label)}" aria-label="${attr(x.person.title+' '+x.label+' 확대')}"><img src="${attr(x.url)}" alt="${attr(x.person.title+' '+x.label)}" loading="lazy"><span class="gallery-zoom-icon">＋ 확대</span></button><div class="gallery-tile-caption"><small>${esc(galleryTypes.find(y=>y[0]===x.type)?.[1]||'일러스트')} · ${String(i+1).padStart(2,'0')}</small><strong>${esc(x.person.title)}</strong><span>${esc(x.label)}</span><button data-character="${attr(x.person.path)}">인물 상세 보기 ❯</button></div></article>`).join('')}</div>`:`<div class="gallery-empty"><span>畵帖</span><h3>표시할 이미지가 없습니다</h3><p>해당 인물·유형의 승인된 이미지가 아직 연결되지 않았습니다. NOVEL 공개 자료와 character-images.json의 galleries 매핑을 확인해 주세요.</p><button class="btn alt" data-go="characters">캐릭터 도감으로 이동 ❯</button></div>`}
 <section class="asset-library" aria-label="공개 이미지 자산 탐색"><div class="asset-library-head"><div><small>ARCHIVE IMAGE INVENTORY · v0.7.9</small><h3>공개 이미지 자산 열람실</h3><p>원본 저장소의 공개 이미지 ${publishedAssets.length}개를 확인합니다. 파일명만으로 인물의 정체를 추정하거나 공식 초상화로 지정하지 않습니다.</p></div><button class="asset-toggle" data-asset-toggle aria-expanded="${assetExpanded}">${assetExpanded?'열람실 닫기':'이미지 열람하기'} ❯</button></div>
 ${assetExpanded?`<div class="asset-library-body"><div class="asset-toolbox"><label>파일명 검색<input id="asset-search" type="search" value="${attr(assetQuery)}" placeholder="예: CHARACTER, 전서율, cover" autocomplete="off"></label><label>파일 형식<select id="asset-type"><option value="all" ${assetType==='all'?'selected':''}>전체 형식</option>${['webp','png','jpg','jpeg','avif'].map(t=>`<option value="${t}" ${assetType===t?'selected':''}>${t.toUpperCase()}</option>`).join('')}</select></label><label>정렬<select id="asset-sort"><option value="name" ${assetSort==='name'?'selected':''}>파일명 순</option><option value="size" ${assetSort==='size'?'selected':''}>파일 크기 순</option></select></label></div><div class="asset-results" aria-live="polite">검색 결과 <strong>${assetVisible.length}</strong>개 · 실제 공개 이미지에 한정</div><section class="asset-compare-panel" aria-label="이미지 비교 작업대"><div class="asset-compare-heading"><div><small>VISUAL REVIEW DESK · 01 / 02</small><h4>공개 이미지 비교 작업대</h4><p>아래 이미지 카드에서 최대 두 장을 선택해 나란히 비교하세요. 비교 결과는 공식 캐릭터 매핑으로 저장되지 않습니다.</p></div><button type="button" data-compare-clear ${assetCompare.length?'':'disabled'}>선택 초기화</button></div><div class="asset-compare-slots">${[0,1].map(i=>{const a=compareAsset(assetCompare[i]);return `<div class="asset-compare-slot ${a?'filled':''}">${a?`<img src="${attr(a.url)}" alt="${attr(a.path)}"><div class="asset-compare-caption"><strong>${esc(a.path.split('/').pop())}</strong><small>${esc(a.path)}</small><button type="button" data-compare-remove="${attr(a.url)}">선택 해제 ×</button></div>`:`<div class="asset-compare-placeholder"><span>${String(i+1).padStart(2,'0')}</span><strong>${i===0?'첫 번째 이미지':'두 번째 이미지'}</strong><small>아래 카드에서 비교할 이미지를 선택하세요</small></div>`}</div>`}).join('')}</div></section><section class="mapping-workbench" aria-label="공식 이미지 연결 검토서"><div class="mapping-head"><small>CANON IMAGE CURATION · REVIEW ONLY</small><h4>공식 일러스트 연결 검토서</h4><p>이미지 파일을 인물에 임의로 연결하지 않습니다. 공개 이미지와 인물을 직접 선택하여 <strong>검토용 매핑 초안</strong>을 작성할 수 있습니다. 이 초안은 운영 데이터에 저장되지 않습니다.</p></div><div class="mapping-layout"><div class="mapping-image">${mappingCandidate&&compareAsset(mappingCandidate)?`<img src="${attr(mappingCandidate)}" alt="선택한 공개 이미지"><small>${esc(publishedAssets.find(a=>a.url===mappingCandidate)?.path||'')}</small>`:'<div class="mapping-placeholder"><span>畵</span><strong>이미지를 선택해 주세요</strong><small>아래 공개 이미지 카드에서 ‘연결 검토’ 선택</small></div>'}</div><div class="mapping-form"><label>대상 인물<select id="mapping-person"><option value="">인물 선택</option>${people.map(d=>`<option value="${attr(d.path)}" ${mappingPerson===d.path?'selected':''}>${esc(d.title)}</option>`).join('')}</select></label><label>이미지 유형<select id="mapping-type">${galleryTypes.filter(x=>x[0]!=='all').map(([k,t])=>`<option value="${k}" ${mappingType===k?'selected':''}>${t}</option>`).join('')}</select></label><label>이미지 설명<input id="mapping-label" type="text" maxlength="70" value="${attr(mappingLabel)}" placeholder="예: 학관 기본 스탠드"></label><div class="mapping-result"><small>검토용 JSON 초안</small><pre>${esc(mappingPreview()||'공개 이미지와 인물을 선택하면 매핑 초안이 표시됩니다.')}</pre></div><div class="mapping-actions"><button type="button" data-mapping-copy ${mappingPreview()?'':'disabled'}>초안 복사</button><button type="button" data-mapping-reset>선택 초기화</button></div><p class="mapping-warning">승인 전 자료 · 자동 저장 및 자동 게시 없음. 실제 반영은 관리자가 원본 설정과 이미지를 대조한 뒤 static/character-images.json에 수동 등록해야 합니다.</p></div></div></section><div class="asset-library-grid">${assetVisible.slice(0,80).map(a=>`<article class="asset-library-card"><button data-zoom="${attr(a.url)}" data-alt="${attr(a.path)}"><img src="${attr(a.url)}" alt="${attr(a.path)}" loading="lazy"><span>＋ 확대</span></button><div><strong title="${attr(a.path)}">${esc(String(a.path).split('/').pop())}</strong><small>${esc(a.path)}</small><div class="asset-meta"><span>${a.bytes?Math.round(a.bytes/1024)+' KB':'크기 미상'}</span><button type="button" data-copy-asset="${attr(a.url)}" aria-label="${attr(a.path)} 배포 경로 복사">경로 복사</button><button type="button" class="asset-compare-add ${assetCompare.includes(a.url)?'selected':''}" data-compare-add="${attr(a.url)}" aria-pressed="${assetCompare.includes(a.url)}">${assetCompare.includes(a.url)?'선택됨 ✓':'비교 선택 +'}</button><button type="button" data-mapping-choose="${attr(a.url)}">연결 검토 ❯</button></div></div></article>`).join('')||'<p class="asset-library-empty">검색 조건에 맞는 공개 이미지가 없습니다.</p>'}</div><p class="asset-library-foot">최대 80개 표시 · 공식 캐릭터 지정은 수동 승인 후 character-images.json에 등록합니다.</p></div>`:''}</section>
 <div class="gallery-docs"><h3>의상 · 일러스트 원본 설정 문서</h3><div class="archive-list">${list(records)}</div></div></div>`;
}
const characterPortrait=d=>{const mapped=portraitManifest[d.path];return typeof mapped==='string'&&/^assets\/[a-zA-Z0-9_./-]+\.(webp|png|jpg|jpeg)$/i.test(mapped)&&!mapped.includes('..')?mapped:(/전서율/.test(d.title)?'assets/jeon-seoyul-stand.webp':'');};
const characterSummary=d=>String(d.body||'').split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!/^#|^\||^---|^>|^!\[/.test(s)).slice(0,2).join(' ').replace(/\*\*/g,'').slice(0,160);
function characterAtlas(){
 const all=characterDocs();const q=characterQuery.trim().toLocaleLowerCase('ko');
 const filtered=all.filter(d=>(d.title+' '+d.path+' '+d.body).toLocaleLowerCase('ko').includes(q));
 return `<div class="page atlas-page"><div class="edition-inner-hero edition-inner-hero-people"><small>CHARACTER ARCHIVE · 天流館</small><h1>인물의 서사</h1><p>검을 쥔 사람들, 서로 다른 선택과 인연의 기록.</p><span>공식 설정 문서 ${all.length}건</span></div>
 <div class="atlas-toolbar"><label for="character-search">인물·설정 검색</label><input id="character-search" type="search" placeholder="이름 또는 설정 검색" value="${attr(characterQuery)}" autocomplete="off"><span aria-live="polite">${filtered.length} / ${all.length} 문서</span></div>
 ${all.length?`<div class="atlas-grid">${filtered.map((d,i)=>`<button class="atlas-card" data-character="${attr(d.path)}"><span class="atlas-index">PERSON · ${String(i+1).padStart(2,'0')}</span><span class="atlas-portrait">${characterPortrait(d)?`<img src="${attr(characterPortrait(d))}" alt="${attr(d.title+' 공식 일러스트')}" loading="lazy">`:`<span aria-hidden="true">人物</span>`}</span><strong>${esc(d.title)}</strong><span class="atlas-summary">${esc(characterSummary(d)||'상세 설정 문서 보기')}</span><span class="atlas-open">상세 프로필 보기 ❯</span></button>`).join('')}</div>${filtered.length?'':'<div class="notice atlas-search-empty">검색 결과가 없습니다.</div>'}`:'<div class="notice">현재 공개 가능한 캐릭터 설정 문서가 없습니다. NOVEL 저장소의 02_CANON/CHARACTERS 경로와 공개 정책을 확인하세요. 임의의 인물 설정은 표시하지 않습니다.</div>'}
 <div class="atlas-secondary"><button class="btn alt" data-go="relationships">관계·감정 문서 ❯</button><button class="btn alt" data-go="costumes">의상·일러스트 문서 ❯</button></div></div>`;
}


// The profile is generated from the published canonical Markdown, never invented biographies.
function characterProfile(){
 const d=characterDocs().find(x=>x.path===activeCharacter);
 if(!d)return `<div class="page profile-page">${heading('인물 상세','공개된 캐릭터 설정 문서를 선택해 주세요.')}<button class="btn alt" data-go="characters">❮ 인물 도감</button></div>`;
 const portrait=characterPortrait(d);
 const related=characterDocs().filter(x=>x.path!==d.path).slice(0,6);
 return `<div class="page profile-page"><div class="edition-profile-banner"><small>CHARACTER DOSSIER · CANON</small><span>天流館 / 人物錄</span></div>
 <button class="profile-back" data-go="characters">❮ 인물 도감으로 돌아가기</button>
 <div class="profile-layout"><aside class="profile-visual"><div class="profile-frame">${portrait?`<img src="${attr(portrait)}" alt="${attr(d.title)} 콘셉트 일러스트">`:`<div class="profile-silhouette" aria-label="공식 이미지 미등록">人物</div>`}</div><small>${portrait?'보유 중인 콘셉트 이미지 · 공식 연결 검수 필요':'공식 캐릭터 이미지 미등록'}</small><span>天流館 · CHARACTER ARCHIVE</span></aside>
 <article class="profile-record"><div class="profile-eyebrow">CHARACTER DOSSIER · CANON</div><h2>${esc(d.title)}</h2><div class="profile-path">${esc(d.path)}</div><div class="profile-divider">❖ ───── ❖ ───── ❖</div><div class="profile-body">${markdown(d.body,d)}</div><div class="profile-actions"><button class="btn alt" data-doc="${attr(d.path)}">원본 설정 문서 보기 ❯</button><button class="btn alt" data-go="relationships">관계 기록 보기 ❯</button><button class="btn alt" data-gallery-person="${attr(d.path)}">일러스트 도감 보기 ❯</button></div></article></div>
 ${related.length?`<div class="profile-related"><h3>다른 인물 살펴보기</h3><div class="profile-related-list">${related.map(x=>`<button data-character="${attr(x.path)}">${esc(x.title)} <span>❯</span></button>`).join('')}</div></div>`:''}</div>`;
}


// Explorer shows document mentions only; mentions are NOT assertions of relationships.
const characterName=d=>String(d.title||'').replace(/^(인물|캐릭터)\s*[:：-]\s*/,'').trim();
function relationExplorer(){
 const people=characterDocs();
 const records=filterPath('02_CANON/CHARACTERS/RELATIONSHIPS/');
 const chosen=people.find(x=>x.path===relationshipFocus)||people[0];
 const name=chosen?characterName(chosen):'';
 const mentions=chosen?people.filter(d=>d.path!==chosen.path).map(d=>{
   const other=characterName(d);
   const evidence=[chosen,...records].filter(r=>other&&String(r.body||'').includes(other));
   return {doc:d,evidence};
 }).filter(x=>x.evidence.length):[];
 return `<div class="page relation-page"><div class="edition-inner-hero edition-inner-hero-relation"><small>RELATIONSHIP RECORDS · 天流館</small><h1>인연의 기록</h1><p>확정 문서에서 함께 언급된 인물의 흔적을 찾아봅니다.</p><span>문서 언급은 관계 확정이나 감정의 증거가 아닙니다.</span></div>
 <div class="relation-layout"><aside class="relation-side"><h3>인물 선택</h3>${people.length?people.map(d=>`<button class="relation-person ${chosen?.path===d.path?'selected':''}" data-relation-focus="${attr(d.path)}" aria-pressed="${chosen?.path===d.path}">${esc(characterName(d))}</button>`).join(''):'<p>공개된 인물 문서가 없습니다.</p>'}</aside>
 <section class="relation-main">${chosen?`<div class="relation-focus"><small>CHARACTER · DOCUMENT EXPLORER</small><h2>${esc(name)}</h2><button class="btn alt" data-character="${attr(chosen.path)}">인물 상세 보기 ❯</button></div><h3>문서 속 인물 언급 <span>${mentions.length}명</span></h3>${mentions.length?`<div class="relation-cards">${mentions.map(x=>`<article class="relation-card"><div><small>DOCUMENT MENTION</small><h4>${esc(characterName(x.doc))}</h4><p>언급된 문서 ${x.evidence.length}건</p></div><div class="relation-actions"><button data-character="${attr(x.doc.path)}">인물 보기</button>${x.evidence.slice(0,2).map(e=>`<button data-doc="${attr(e.path)}">근거 문서 ↗</button>`).join('')}</div></article>`).join('')}</div>`:'<div class="notice">공개 문서에서 다른 인물 이름이 언급된 기록을 찾지 못했습니다. 관계를 임의로 생성하지 않습니다.</div>'}`:'<div class="notice">먼저 공개된 인물 설정 문서가 필요합니다.</div>'}
 <div class="relation-records"><h3>공식 관계·감정 문서</h3><div class="archive-list">${list(records)}</div></div></section></div></div>`;
}

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

function home(){
 const recent=chapters().slice(-4).reverse();
 const routes=[['01','NOVEL','소설 본편','학관에서 시작되는 이야기','novel'],['02','CHARACTER','인물 도감','선택과 관계의 기록','characters'],['03','WORLD','무림 세계관','정 · 사 · 마의 질서','world'],['04','ARCHIVE','통합 설정집','확정된 세계의 기록','canon']];
 return `<div class="edition-home">
 <section class="edition-cover"><div class="edition-sky" aria-hidden="true"></div><div class="edition-mountains" aria-hidden="true"></div><div class="edition-cover-frame" aria-hidden="true"></div><div class="edition-cover-copy"><span class="edition-kicker">THE CHRONICLES OF CHEONRYUGWAN <i>·</i> PART I</span><div class="edition-rule"></div><div class="edition-seal">天流館</div><h1>천류관</h1><p class="edition-subtitle">설산의 그림자 · 학관의 첫해</p><p class="edition-lead">낯선 무림에 떨어진 한 사람.<br>검을 배우고, 사람을 만나고,<br>자신만의 길을 찾아가는 이야기.</p><div class="edition-cover-actions"><button data-go="novel" class="edition-primary">첫 장 펼치기 <span>↗</span></button><button data-go="characters" class="edition-secondary">인물 만나기 <span>↗</span></button></div><div class="edition-scroll-cue">SCROLL TO EXPLORE <span>↓</span></div></div><div class="edition-portrait-wrap"><span class="edition-portrait-halo" aria-hidden="true"></span><img class="edition-portrait" src="assets/jeon-seoyul-stand.webp" alt="전서율 콘셉트 일러스트"><span class="edition-portrait-label">全書律 <b>전서율</b> / THE OUTSIDER</span></div><span class="edition-vertical" aria-hidden="true">正 · 邪 · 魔 — A WORLD OF MARTIAL ARTS</span></section>
 <section class="edition-chapter"><div class="edition-section-head"><span>01 / BEGIN THE JOURNEY</span><h2>이야기 속으로</h2><p>하나의 학관, 서로 다른 세력, 그리고 그곳에서 시작되는 인연.</p></div><div class="edition-route-grid">${routes.map(([n,en,title,desc,to])=>`<button class="edition-route edition-route-${n}" data-go="${to}"><span class="edition-route-number">${n} <i>—</i> ${en}</span><span class="edition-route-body"><strong>${title}</strong><small>${desc}</small></span><span class="edition-route-arrow">↗</span></button>`).join('')}</div></section>
 <section class="edition-factions"><div class="edition-section-head"><span>02 / THE THREE PATHS</span><h2>세 갈래 무림</h2><p>서로 다른 신념이 마주하는 세계.</p></div><div class="edition-faction-grid">${factions.map((f,i)=>`<button class="edition-faction edition-faction-${i}" data-go="world"><span class="edition-faction-hanja">${f[1]}</span><img src="${EMBLEMS[f[3]]}" alt="${f[0]} 문양"><strong>${f[0]}</strong><small>${f[2]}</small><span class="edition-faction-link">세력 살펴보기 ↗</span></button>`).join('')}</div></section>
 <section class="edition-latest"><div class="edition-latest-intro"><span>03 / THE LATEST PAGES</span><h2>최근의 기록</h2><p>실제 공개된 원고에서 최신 회차를 불러옵니다.</p><button data-go="novel" class="edition-text-link">전체 원고 보기 ↗</button></div><div class="edition-latest-list">${recent.length?recent.map((d,i)=>`<button class="edition-latest-item" data-doc="${attr(d.path)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(d.title)}</strong><small>원고 읽기 ↗</small></button>`).join(''):'<div class="edition-empty">아직 공개된 원고가 없습니다. NOVEL 원본 빌드 상태를 확인해 주세요.</div>'}</div></section>
 <div class="edition-bottom"><span>天流館 · NOVEL ARCHIVE</span><button data-go="design">디자인 참고 자료 보기 ↗</button><small>콘텐츠 출처: min-ser/NOVEL · ${esc(sourceRevision.slice(0,10))}</small></div>
 </div>`
}
function novel(){
 const parts=['PART_01_ACADEMY','PART_02','PART_03','PART_04'];
 const chosen=parts.includes(tab)?tab:parts[0];const records=chapters().filter(d=>d.part===chosen);
 return `<div class="edition-library"><section class="edition-library-hero"><div class="edition-library-hero-copy"><small>THE CHRONICLES · VOLUME ${String(parts.indexOf(chosen)+1).padStart(2,'0')}</small><h1>이야기의 서고</h1><p>학관의 문이 열리고, 한 사람의 이야기가 시작된다.<br>공개된 원고를 선택해 고서의 페이지를 펼쳐보세요.</p><div class="edition-library-meta"><span>天流館 · NOVEL</span><span>공개 회차 ${records.length}편</span></div></div><span class="edition-library-watermark" aria-hidden="true">書</span></section>
 <div class="edition-library-content"><div class="edition-library-heading"><div><small>01 / SELECT A VOLUME</small><h2>권별 목차</h2></div><span>정식 공개 원고만 표시</span></div><div class="edition-volume-tabs" role="group" aria-label="소설 부 선택">${parts.map((part,i)=>`<button class="${chosen===part?'selected':''}" data-part="${part}" aria-pressed="${chosen===part}"><small>VOLUME ${String(i+1).padStart(2,'0')}</small><strong>${i+1}부</strong><span>${i===0?'학관편':'원고 확인'}</span></button>`).join('')}</div>
 <div class="edition-library-heading edition-library-heading-second"><div><small>02 / CHAPTER INDEX</small><h2>${parts.indexOf(chosen)+1}부 · 공개 원고</h2></div><span>${records.length} CHAPTERS</span></div>
 ${records.length?`<div class="edition-chapter-list">${records.map((d,i)=>`<button class="edition-chapter-row" data-doc="${attr(d.path)}"><span class="edition-chapter-no">${String(i+1).padStart(2,'0')}</span><span class="edition-chapter-text"><small>CHAPTER · ${String(i+1).padStart(3,'0')}</small><strong>${esc(d.title)}</strong><span>${esc(d.path.split('/').pop())}</span></span><span class="edition-chapter-open">읽기 시작 ↗</span></button>`).join('')}</div>`:'<div class="edition-library-empty"><span>未刊</span><h3>공개된 원고가 없습니다</h3><p>이 권의 원고가 공개되면 여기에 자동으로 표시됩니다. 임의의 회차는 생성하지 않습니다.</p></div>'}
 </div></div>`
}
const worldCategories=[['factions','세력과 질서','正 · 邪 · 魔'],['martial','무학과 경지','武學 · 境界'],['timeline','학관의 기록','年譜 · ARCHIVE']];
const realmNames=['초수','중수','고수','절정','초절정','화경'];
const realmYears=['기초 수련','수련의 심화','숙련의 축적','깨달음의 문턱','국가급 고수','극의의 경지'];
const worldDocs=()=>canon().filter(d=>/^02_CANON\/(WORLD|MARTIAL_ARTS|TIMELINE|CHRONOLOGY|HISTORY)\//i.test(d.path));
const worldTopic=d=>/MARTIAL_ARTS\//i.test(d.path)?'martial':/(TIMELINE|CHRONOLOGY|HISTORY)\//i.test(d.path)?'timeline':/(연표|시간|사건|timeline|chronology)/i.test(d.title+' '+d.path)?'timeline':'factions';
function world(){
 const all=worldDocs();const q=worldQuery.trim().toLocaleLowerCase('ko');
 const scoped=all.filter(d=>worldTopic(d)===worldTab).filter(d=>worldFaction==='all'||(d.title+' '+d.body).includes(worldFaction)).filter(d=>!q||(d.title+' '+d.path+' '+d.body).toLocaleLowerCase('ko').includes(q));
 const topic=worldCategories.find(x=>x[0]===worldTab)||worldCategories[0];
 const factionCards=factions.map((f,i)=>`<button type="button" class="world-faction-card ${worldFaction===f[0]?'chosen':''} ${f[3]}" data-world-faction="${f[0]}" aria-pressed="${worldFaction===f[0]}"><img src="${attr(EMBLEMS[f[3]])}" alt="" loading="lazy"><span class="world-faction-ideogram">${f[1]}</span><strong>${f[0]}</strong><span class="world-faction-desc">${esc(f[2])}</span><small>관련 설정 문서 보기 ❯</small></button>`).join('');
 const chaptersPublished=chapters();
 return `<div class="page world-page"><section class="world-hero"><div class="world-hero-art" aria-hidden="true"></div><div class="world-hero-content"><span class="world-overline">THE WORLD OF CHEONRYUGWAN · 天流館</span><h2>무림의 세 갈래 길</h2><p>하나의 강호, 서로 다른 신념. 정파와 사파, 마교의 기록을 따라 무학의 깊이와 학관의 시간을 탐색합니다.</p><div class="world-hero-stats"><span><strong>${all.length}</strong>공개 세계관 문서</span><span><strong>${chaptersPublished.length}</strong>공개 학관편 회차</span><span><strong>03</strong>세력의 길</span></div></div></section>
 <nav class="world-tabs" aria-label="세계관 분류">${worldCategories.map(([key,label,sub])=>`<button type="button" data-world-tab="${key}" class="${worldTab===key?'active':''}" aria-pressed="${worldTab===key}"><small>${sub}</small><strong>${label}</strong></button>`).join('')}</nav>
 <div class="world-panel-head"><div><small>ARCHIVE / ${topic[2]}</small><h3>${topic[1]}</h3></div><p>원본 NOVEL의 공개 설정 문서만 연결됩니다. 문서가 없는 항목은 확정된 원문을 대신 만들어 표시하지 않습니다.</p></div>
 ${worldTab==='factions'?`<div class="world-factions"><button type="button" class="world-faction-all ${worldFaction==='all'?'chosen':''}" data-world-faction="all" aria-pressed="${worldFaction==='all'}">세력 전체 보기 <span>❖</span></button><div class="world-faction-grid">${factionCards}</div></div>`:''}
 ${worldTab==='martial'?`<div class="world-realm-wrap"><div class="world-realm-caption"><strong>무학 경지의 길</strong><span>설정 개요 · 상세 근거는 원본 무학 문서 확인</span></div><div class="world-realm-grid">${realmNames.map((name,i)=>`<div class="world-realm ${i>=3?'higher':''}"><span class="world-realm-number">${String(i+1).padStart(2,'0')}</span><strong>${name}</strong><small>${realmYears[i]}</small></div>`).join('')}</div><p class="world-realm-note">초수 → 중수 → 고수 → 절정 → 초절정 → 화경. 경지의 세부 조건과 인물별 도달 여부는 공개된 원본 설정 문서에서 확인합니다.</p></div>`:''}
 ${worldTab==='timeline'?`<div class="world-timeline"><div class="world-timeline-line"><div class="world-timeline-node"><small>PART 01</small><strong>학관편</strong><p>공개된 학관편 회차를 읽는 순서대로 확인합니다. 계절·사건의 정확한 시점은 원본 문서가 제공할 때만 표시합니다.</p></div><div class="world-timeline-node"><small>SOURCE RECORDS</small><strong>세계관 연표</strong><p>아래에 공개된 연표 문서가 있다면 연결됩니다. 비공개 초안이나 폐기된 사건은 포함하지 않습니다.</p></div></div><button type="button" class="world-timeline-link" data-go="novel">학관편 원고 읽기 ❯</button></div>`:''}
 <section class="world-records"><div class="world-records-top"><div><small>VERIFIED CANON INDEX</small><h3>원본 설정 기록</h3><p>현재 분류: ${esc(topic[1])} · ${scoped.length}건 / ${all.length}건</p></div><label>문서 검색<input id="world-search" type="search" value="${attr(worldQuery)}" placeholder="제목·내용·경로 검색" autocomplete="off"></label></div>${worldTab==='factions'&&worldFaction!=='all'?`<p class="world-filter-status">${esc(worldFaction)} 관련 원문을 검색하고 있습니다. <button type="button" data-world-faction="all">전체 세력 보기</button></p>`:''}<div class="world-record-grid">${scoped.length?scoped.map(d=>`<button class="world-record" data-doc="${attr(d.path)}"><small>${esc(d.path)}</small><strong>${esc(d.title)}</strong><span>원문 열람 ❯</span></button>`).join(''):`<div class="world-no-record"><span>未錄</span><h4>이 분류의 공개 원문이 없습니다</h4><p>검색 조건을 변경하거나 NOVEL의 공개 설정 문서를 확인해 주세요. 설정을 임의로 채우지 않습니다.</p></div>`}</div></section>
 <div class="world-end-link"><button class="btn alt" data-go="canon">통합 설정집으로 이동 ❯</button><button class="btn alt" data-go="characters">인물 도감으로 이동 ❯</button></div></div>`;
}
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
  <div class="reader-top"><button data-go="novel" aria-label="회차 목록으로 돌아가기">← 목차</button><span class="reader-chapter-name">${esc(d.title)}</span><div class="reader-settings"><label>글자 <input id="fontSize" aria-label="글자 크기" type="range" min="13" max="23" value="${readerSize}"></label><button data-theme="toggle" aria-label="고서 색상 전환">${readerTheme==='paper'?'야간 독서':'한지 독서'}</button><button data-motion="toggle" aria-pressed="${motionEnabled}">효과 ${motionEnabled?'ON':'OFF'}</button></div></div>
  <div class="reading-stage">
   <div class="antique-book ${bookOpened?'opened':'closed'} ${readerTheme}" id="antiqueBook">
    <div class="book-cover-face" id="bookCover"><div class="cover-emblem">天流館</div><div class="cover-ornament">❖ ─── ✦ ─── ❖</div><div class="cover-book-title">${esc(d.title)}</div><div class="cover-subtitle">천류관 · 소설 본편</div><button class="open-book-button" data-open-book>책 펼치기 <span aria-hidden="true">❯</span></button></div>
    <div class="book-spread" id="bookSpread" ${bookOpened?'':'hidden'}><div class="book-leaf left-leaf"><div class="leaf-content" id="leftPage"></div><div class="leaf-number" id="leftNumber"></div></div><div class="book-leaf right-leaf"><div class="leaf-content" id="rightPage"></div><div class="leaf-number" id="rightNumber"></div></div><div class="book-spine"></div><div class="book-flip-sheet" aria-hidden="true"></div></div>
    <div class="chapter-vision" id="chapterVision" aria-hidden="true">${cover?`<img src="${attr(cover)}" alt="">`:''}<div class="vision-title">${esc(d.title)}</div></div>
   </div>
  </div>
  <div class="reader-bottom"><span class="edition-reader-hint">← → 방향키로 넘기기</span><button id="prevSpread" data-spread="prev" aria-label="이전 두 페이지">❮ 이전</button><span class="reader-progress-wrap"><span id="readingProgress" aria-live="polite">${bookOpened?'페이지 준비 중':'표지를 눌러 책을 펼치세요'}</span><button id="nextSpread" data-spread="next" aria-label="다음 두 페이지">다음 ❯</button></div>
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
function render(){let out=status==='loading'?section('콘텐츠 불러오는 중','content.json을 확인하고 있습니다',[]):status==='error'?`<div class="page">${heading('콘텐츠를 불러오지 못했습니다','content.json 생성 또는 배포 경로를 확인하세요')}<div class="notice">NOVEL 원본 저장소 동기화에 실패했습니다. Git 접근 권한 및 네트워크를 확인하세요. 예시 원고는 실제 프로젝트에 표시하지 않습니다.</div></div>`:page==='home'?home():page==='design'?designGallery():page==='novel'?novel():page==='characters'?characterAtlas():page==='character-profile'?characterProfile():page==='relationships'?relationExplorer():page==='costumes'?characterGallery():page==='world'?world():page==='canon'?section('통합 설정집','02_CANON/MASTER_REFERENCE.md',canon().filter(d=>d.path==='02_CANON/MASTER_REFERENCE.md'||d.path==='02_CANON/CANON_INDEX.md')):page==='history'?`<div class="page">${heading('개정 기록','04_ARCHIVE는 기본적으로 공개 빌드에서 제외됩니다')}<div class="notice">과거 원본 및 폐기 자료는 공개 정책 확정 후 별도로 제공할 수 있습니다. 현재는 정식 원고와 확정 설정만 게시합니다.</div></div>`:page==='reader'?reader():home();main.innerHTML=out;document.body.classList.toggle('reading-mode',page==='reader'&&docs.find(x=>x.path===selected)?.kind==='novel');if(page==='reader'&&bookOpened)requestAnimationFrame(()=>paginateBook());document.querySelectorAll('.nav button').forEach(b=>{const active=b.dataset.go===page;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')})}
function navigate(p,doc){savePage();page=p;if(doc!==undefined){if(selected!==doc){bookOpened=false;bookPage=0;bookPages=[]}selected=doc}else{selected='';bookOpened=false;bookPage=0;bookPages=[]}history.pushState({page,selected,activeCharacter},'',`#${encodeURIComponent(page)}${selected&&page==='reader'?'?doc='+encodeURIComponent(selected):''}${page==='character-profile'?'?character='+encodeURIComponent(activeCharacter):''}`);render();closeMobileMenu();window.scrollTo(0,0)}
// Update only search results, not the focused input: Korean IME composition stays intact.
document.addEventListener('input',e=>{
 if(e.target.id!=='character-search')return;
 characterQuery=e.target.value;
 const q=characterQuery.trim().toLocaleLowerCase('ko');
 const all=characterDocs();
 const filtered=all.filter(d=>(d.title+' '+d.path+' '+d.body).toLocaleLowerCase('ko').includes(q));
 const atlas=document.querySelector('.atlas-page');
 if(!atlas)return;
 const fragment=document.createElement('div');fragment.innerHTML=characterAtlas();
 const replacement=fragment.querySelector('.atlas-grid');
 const current=atlas.querySelector('.atlas-grid');
 if(current&&replacement)current.replaceWith(replacement);
 const oldNotice=atlas.querySelector('.atlas-search-empty');if(oldNotice)oldNotice.remove();
 if(all.length&&!filtered.length){
  const notice=document.createElement('div');notice.className='notice atlas-search-empty';notice.textContent='검색 결과가 없습니다.';
  (atlas.querySelector('.atlas-grid')||atlas.querySelector('.atlas-toolbar')).after(notice);
 }
 const counter=atlas.querySelector('.atlas-toolbar [aria-live]');if(counter)counter.textContent=`${filtered.length} / ${all.length} 문서`;
});
document.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;if(b.dataset.worldTab){worldTab=b.dataset.worldTab;worldQuery='';worldFaction='all';render()}else if(b.dataset.worldFaction){worldFaction=b.dataset.worldFaction;render()}else if(b.dataset.mappingChoose){if(compareAsset(b.dataset.mappingChoose)){mappingCandidate=b.dataset.mappingChoose;render();document.querySelector('.mapping-workbench')?.scrollIntoView({behavior:'smooth',block:'start'})}}else if(b.dataset.mappingReset!==undefined){mappingCandidate='';mappingPerson='';mappingType='stand';mappingLabel='';render()}else if(b.dataset.mappingCopy!==undefined){const value=mappingPreview();if(value){if(navigator.clipboard?.writeText)navigator.clipboard.writeText(value).then(()=>{b.textContent='복사됨 ✓'}).catch(()=>{b.textContent='복사 실패'});else b.textContent='복사 미지원'}}else if(b.dataset.compareAdd){const u=b.dataset.compareAdd;if(compareAsset(u)){if(assetCompare.includes(u))assetCompare=assetCompare.filter(x=>x!==u);else assetCompare=[...assetCompare.slice(-1),u];render()}}else if(b.dataset.compareRemove){assetCompare=assetCompare.filter(u=>u!==b.dataset.compareRemove);render()}else if(b.dataset.compareClear!==undefined){assetCompare=[];render()}else if(b.dataset.copyAsset){const val=b.dataset.copyAsset;if(navigator.clipboard?.writeText){navigator.clipboard.writeText(val).then(()=>{b.textContent='복사됨 ✓';}).catch(()=>{b.textContent=val;})}else{b.textContent=val}}else if(b.dataset.assetToggle!==undefined){assetExpanded=!assetExpanded;render()}else if(b.dataset.design)openDesign(b.dataset.design);else if(b.dataset.character){activeCharacter=b.dataset.character;navigate('character-profile')}else if(b.dataset.galleryFilter){galleryFilter=b.dataset.galleryFilter;render()}else if(b.dataset.galleryPerson){galleryFocus=b.dataset.galleryPerson;galleryFilter='all';navigate('costumes')}else if(b.dataset.relationFocus){relationshipFocus=b.dataset.relationFocus;render()}else if(b.dataset.openBook!==undefined)openBook();else if(b.dataset.spread)flipSpread(b.dataset.spread==='next'?1:-1);else if(b.dataset.doc!==undefined)page==='reader'?turnChapter(b.dataset.doc):navigate('reader',b.dataset.doc);else if(b.dataset.go)navigate(b.dataset.go);else if(b.dataset.part){tab=b.dataset.part;render()}else if(b.dataset.theme){readerTheme=readerTheme==='paper'?'dark':'paper';render()}else if(b.dataset.restart!==undefined){try{localStorage.removeItem(bookmarkKey(selected))}catch{}bookPage=0;if(bookOpened)showSpread()}else if(b.dataset.motion){motionEnabled=!motionEnabled;localStorage.setItem('crg-motion',motionEnabled?'on':'off');b.textContent='효과 '+(motionEnabled?'ON':'OFF');b.setAttribute('aria-pressed',String(motionEnabled))}else if(b.dataset.zoom){openIllustration(b.dataset.zoom,b.dataset.alt||'삽화')}});
document.addEventListener('change',e=>{if(e.target.id==='mapping-person'){mappingPerson=e.target.value;render()}else if(e.target.id==='mapping-type'){mappingType=e.target.value;render()}else if(e.target.id==='gallery-person'){galleryFocus=e.target.value;galleryFilter='all';render()}else if(e.target.id==='asset-type'){assetType=e.target.value;render()}else if(e.target.id==='asset-sort'){assetSort=e.target.value;render()}});
document.addEventListener('input',e=>{if(e.target.id==='fontSize'){readerSize=Number(e.target.value);document.querySelector('.immersive-reader')?.style.setProperty('--reader-size',readerSize+'px');if(bookOpened)requestAnimationFrame(paginateBook)}if(e.target.id==='lineSpacing'){readerSpacing=Number(e.target.value)/10;document.querySelector('.archive-reader')?.style.setProperty('--reader-spacing',readerSpacing)}});
let resizeFrame=0;window.addEventListener('resize',()=>{if(bookOpened){cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(paginateBook)}});document.addEventListener('load',e=>{if(bookOpened&&e.target.matches?.('.leaf-content img'))paginateBook()},true);document.addEventListener('keydown',e=>{if(page!=='reader'||!bookOpened||e.target.closest('input,textarea,dialog'))return;if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();flipSpread(1)}else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();flipSpread(-1)}});window.addEventListener('popstate',()=>{readHash();render()});
function readHash(){let hash=decodeURIComponent(location.hash.slice(1));let split=hash.indexOf('?doc=');page=split>=0?hash.slice(0,split):hash||'home';selected=split>=0?hash.slice(split+5):'';if(page==='character-profile'){activeCharacter=hash.split('?character=')[1]||'';try{activeCharacter=decodeURIComponent(activeCharacter)}catch{}}}
readHash();render();
fetch('./content.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{if(!Array.isArray(data.items))throw Error('Invalid manifest');if(data.source==='demo-preview'||data.revision==='SAMPLE-CONTENT-NOT-SYNCED')throw Error('Demo content prohibited in production');if(data.syncStatus==='failed'||data.syncStatus==='not_synced'||data.revision==='SYNC_FAILED'||data.revision==='NOT_SYNCED'||!data.items.some(d=>d.kind==='novel'))throw Error('NOVEL content was not synchronized: '+(data.message||data.revision));docs=data.items.filter(d=>d&&typeof d.path==='string'&&typeof d.body==='string'&&['novel','canon'].includes(d.kind));sourceRevision=data.revision||'';publishedAssets=Array.isArray(data.assets)?data.assets:[];status='ready';render()}).catch(err=>{console.error('Novel Archive content load failed',err);status='error';render()});

fetch("./character-images.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error("portrait manifest missing");return r.json()}).then(m=>{if(m&&m.schemaVersion===1&&m.portraits&&typeof m.portraits==="object"){portraitManifest=m.portraits;galleryManifest=m.galleries&&typeof m.galleries==='object'?m.galleries:{};if(status==="ready")render()}}).catch(()=>{});

document.addEventListener('input',e=>{if(e.target.id==='world-search'){const pos=e.target.selectionStart;worldQuery=e.target.value;render();const input=document.getElementById('world-search');if(input){input.focus();input.setSelectionRange(pos,pos)}return}if(e.target.id==='mapping-label'){mappingLabel=e.target.value;const pre=document.querySelector('.mapping-result pre');if(pre)pre.textContent=mappingPreview()||'공개 이미지와 인물을 선택하면 매핑 초안이 표시됩니다.';return}if(e.target.id==='asset-search'){const pos=e.target.selectionStart;assetQuery=e.target.value;render();const input=document.getElementById('asset-search');if(input){input.focus();input.setSelectionRange(pos,pos)}}});

// v0.9.0: accessible mobile navigation without altering route or document data.
function closeMobileMenu(){const top=document.querySelector('.top'),toggle=document.querySelector('#menuToggle');top?.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');if(toggle){toggle.textContent='☰ 메뉴';toggle.setAttribute('aria-label','전체 메뉴 열기')}}
document.querySelector('#menuToggle')?.addEventListener('click',()=>{const top=document.querySelector('.top'),toggle=document.querySelector('#menuToggle');const open=top.classList.toggle('menu-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕ 닫기':'☰ 메뉴';toggle.setAttribute('aria-label',open?'전체 메뉴 닫기':'전체 메뉴 열기')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('.top.menu-open')){closeMobileMenu();document.querySelector('#menuToggle')?.focus()}});
document.addEventListener('click',e=>{if(document.querySelector('.top.menu-open')&&!e.target.closest('.top'))closeMobileMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMobileMenu()});
