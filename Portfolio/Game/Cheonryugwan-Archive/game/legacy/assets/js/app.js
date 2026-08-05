const $=s=>document.querySelector(s);
let story=[],index=0;
const menu=$("#menu"),novel=$("#novel"),speaker=$("#speaker"),text=$("#text"),choices=$("#choices"),next=$("#next"),progress=$("#progress");
async function load(){const r=await fetch("./data/stories/sample-prologue.json");story=await r.json();}
function screen(name){menu.classList.toggle("active",name==="menu");novel.classList.toggle("active",name==="novel");}
function save(){localStorage.setItem("cheonryugwan-save",JSON.stringify({index}));}
function render(){
 const n=story[index];
 if(!n){speaker.textContent="";text.textContent="v0.1.0 샘플이 끝났습니다.\n실제 원고를 story/_INBOX에 넣으면 본편으로 변환합니다.";choices.innerHTML="";next.style.display="block";next.textContent="메뉴로";next.onclick=()=>screen("menu");return;}
 speaker.textContent=n.speaker||"";text.textContent=n.text;progress.textContent=`${index+1} / ${story.length}`;choices.innerHTML="";next.style.display="block";
 if(n.choices){next.style.display="none";n.choices.forEach(c=>{const b=document.createElement("button");b.textContent=c.text;b.onclick=()=>{index=c.next;save();render();};choices.appendChild(b);});}
 else{next.textContent="다음";next.onclick=()=>{index++;save();render();};}
}
$("#newGame").onclick=async()=>{await load();index=0;save();screen("novel");render();};
$("#continueGame").onclick=async()=>{await load();index=JSON.parse(localStorage.getItem("cheonryugwan-save")||'{"index":0}').index||0;screen("novel");render();};
$("#backMenu").onclick=()=>screen("menu");
if("serviceWorker"in navigator)navigator.serviceWorker.register("./service-worker.js");
