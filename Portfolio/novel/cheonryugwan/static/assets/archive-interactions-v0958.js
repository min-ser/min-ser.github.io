
/* v0.9.58: demo-only controls; same interaction script also available in project publishing */
(()=>{
const data=[{"title": "학관의 문턱", "paragraphs": ["봄비가 그친 학관의 돌계단에는 아직 물기가 남아 있었다.", "나는 검을 쥔 손을 내려다보았다. 익숙하지 않은 무게가 손바닥에 고스란히 전해졌다.", "“호흡을 먼저 맞춰.” 곁에 선 윤태경이 낮은 목소리로 말했다.", "아직은 점도, 선도, 그 사이의 흐름도 분명하지 않았다."]}, {"title": "검을 쥐는 법", "paragraphs": ["윤태경은 내 손목을 살피더니 검을 조금 내려 보라고 했다.", "힘을 빼라는 말은 쉬웠지만, 검을 놓치지 않을 만큼만 쥐는 일은 생각보다 어려웠다.", "나는 다시 발을 옮겼다. 이번에는 어깨가 먼저 굳지 않도록 주의했다."]}, {"title": "낯선 시선", "paragraphs": ["학관의 복도에는 여러 가문의 문양을 단 학생들이 오갔다.", "낯선 이름들이 귓가를 스쳤다. 나는 그들 사이를 지나며 옷깃을 여몄다.", "이곳에서 내 이름은 아직 아무 의미도 없었다."]}, {"title": "작은 깨달음", "paragraphs": ["백소윤이 건넨 교본의 경맥도를 다시 펼쳤다.", "어제는 서로 떨어져 보이던 설명들이 오늘은 조금씩 이어지는 듯했다.", "하나의 점에서 다음 점으로. 그 사이에 이어지는 길이 있었다."]}, {"title": "첫 번째 대련", "paragraphs": ["연무장 바닥의 흙먼지가 발끝에서 일었다.", "상대의 검끝이 움직였다. 나는 그 움직임보다 먼저 어깨와 발의 방향을 보았다.", "아직 완벽하지 않았다. 그래도 이번에는 물러설 곳을 스스로 정할 수 있었다."]}];
let chapter=0,size=17;
const q=s=>document.querySelector(s);
const qa=s=>Array.from(document.querySelectorAll(s));
function render(){
 const title=q('#v58-title'),page=q('#reader .folio-recto');if(!title||!page)return;
 title.textContent='제'+(chapter+1)+'화 · '+data[chapter].title;
 qa('#reader .folio-recto .v58-prose').forEach(n=>n.remove());
 const mark=page.querySelector('.folio-number');
 data[chapter].paragraphs.forEach(t=>{const p=document.createElement('p');p.className='v58-prose';p.textContent=t;mark.before(p)});
 page.style.setProperty('--v58-font',size+'px');
 q('#v58-current').textContent=(chapter+1)+' / '+data.length;
 const selected=q('#v58-selected');if(selected)selected.textContent='선택한 회차 · 제'+(chapter+1)+'화 '+data[chapter].title;
 qa('#novel .item-link[data-chapter]').forEach((a,i)=>{a.classList.toggle('v58-active',i===chapter);if(i===chapter)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
}
qa('#novel .item-link[data-chapter]').forEach(a=>a.addEventListener('click',()=>{chapter=Number(a.dataset.chapter);render()}));
qa('[data-v58]').forEach(b=>b.addEventListener('click',()=>{
 switch(b.dataset.v58){case 'prev':chapter=Math.max(0,chapter-1);break;case 'next':chapter=Math.min(data.length-1,chapter+1);break;case 'smaller':size=Math.max(14,size-1);break;case 'larger':size=Math.min(23,size+1);break;case 'toc':location.hash='novel';return;}
 render();
}));
const canon=[['무림의 세력','정파는 가문의 질서와 예법을 중시하고, 사파는 강자의 힘을 중심으로 움직이며, 마교는 강한 통제 체계를 가진다.'],['무학과 경지','초수 → 중수 → 고수 → 절정 → 초절정 → 화경. 절정부터는 수련만이 아닌 깨달음이 필요하다.'],['천류관 학관','정파·사파·마교의 학생들이 함께 배우는 학관. 입관부터 졸업까지의 생활과 무학 수련이 이어진다.'],['주요 인물과 가문','전서율, 윤태경(청하 윤가), 백소윤, 남궁설아, 제갈연, 진하연 등 여러 인물의 기록을 살핀다.']];
qa('#canon .canon-toc a[data-canon]').forEach(a=>a.addEventListener('click',()=>{const i=Number(a.dataset.canon),sheet=q('#canon .canon-sheet');sheet.querySelector('h3').textContent=canon[i][0];sheet.querySelectorAll('p').forEach((p,j)=>{if(j===0)p.textContent=canon[i][1];else p.style.display='none'});qa('#canon .canon-toc a').forEach(x=>x.classList.toggle('v58-active',x===a))}));
const regions=[['천류관','정사마 학생들이 함께 수련하는 학관. 이 화면은 지리적 위치가 확정되지 않은 개념도다.'],['정파','가문과 예법, 전통적인 질서를 중시하는 세력.'],['사파·마교','사파는 강자의 힘을, 마교는 강력한 통제와 권력 체계를 중심으로 움직인다.']];
qa('#world .atlas-node[data-region]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const i=Number(a.dataset.region),panel=q('#world .atlas-ledger');panel.querySelector('h3').textContent=regions[i][0];panel.querySelectorAll('p').forEach((p,j)=>{if(j===0)p.textContent=regions[i][1];else p.style.display='none'});qa('#world .atlas-node').forEach(x=>x.classList.toggle('v58-active',x===a))}));
render();
})();
