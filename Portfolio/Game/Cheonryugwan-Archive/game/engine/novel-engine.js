
const PATHS={
  chapter:"./data/volume-01/part-01/chapter-01.json",
  characters:"./data/system/characters.json",
  backgrounds:"./data/system/backgrounds.json",
  audio:"./data/system/audio.json"
};
const AUTO_KEY="cheonryugwan-v060-auto";
const SLOT_KEY="cheonryugwan-v060-slot-";
const SETTINGS_KEY="cheonryugwan-v060-settings";
const $=s=>document.querySelector(s);
function bindClick(selector, handler){
  const element=document.querySelector(selector);
  if(!element){console.warn("[천류관 게임] 요소 없음:",selector);return}
  element.addEventListener("click",handler);
}

let chapter, characters, backgrounds, audioManifest;
let index=0, typing=false, fullText="", typeTimer=null, autoTimer=null;
let variables={}, log=[], saveMode="save";
let settings={textSpeed:24,volume:55,rain:true,muted:false};
let audioCtx=null, masterGain=null, rainNode=null, rainGain=null, rainAudio=null;
const title=$("#title-screen"),novel=$("#novel-screen"),dialogue=$("#dialogue"),speaker=$("#speaker"),stage=$("#stage");
function setStatus(text,type=""){const el=$("#runtime-status");if(!el)return;el.textContent=text;el.className="runtime-status "+type}

async function loadJson(path){const r=await fetch(path,{cache:"no-store"});if(!r.ok)throw new Error(path);return r.json()}
async function initData(){
  [chapter,characters,backgrounds,audioManifest]=await Promise.all([
    loadJson(PATHS.chapter),loadJson(PATHS.characters),loadJson(PATHS.backgrounds),loadJson(PATHS.audio)
  ]);
  $("#chapter-title").textContent=`1화 — ${chapter.title}`;
}
function showScreen(name){title.classList.toggle("active",name==="title");novel.classList.toggle("active",name==="novel")}
function loadSettings(){
  settings={...settings,...JSON.parse(localStorage.getItem(SETTINGS_KEY)||"{}")};
  $("#text-speed").value=settings.textSpeed;$("#master-volume").value=settings.volume;$("#rain-toggle").checked=settings.rain;
}
function saveSettings(){
  settings.textSpeed=Number($("#text-speed").value);settings.volume=Number($("#master-volume").value);settings.rain=$("#rain-toggle").checked;
  localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));applyVolume();if(settings.rain&&!settings.muted)startRain();else stopRain();
}
async function ensureAudio(){
  if(!audioCtx){
    audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    masterGain=audioCtx.createGain();masterGain.connect(audioCtx.destination);applyVolume();
  }
  if(audioCtx.state==="suspended"){
    try{await audioCtx.resume()}catch(error){console.warn("Audio resume failed",error)}
  }
  return audioCtx;
}
function applyVolume(){if(masterGain)masterGain.gain.value=settings.muted?0:settings.volume/100;if(rainAudio)rainAudio.volume=settings.muted?0:(settings.volume/100)*0.55}
async function startRain(){
  await ensureAudio();
  if(rainAudio||!settings.rain||settings.muted)return;
  const info=audioManifest.ambient.rain;
  rainAudio=new Audio(info.path);
  rainAudio.loop=Boolean(info.loop);
  rainAudio.volume=Math.max(0,Math.min(1,(settings.volume/100)*0.55));
  try{await rainAudio.play();setStatus("비 음원 재생 중","ok")}catch(error){console.warn("Rain audio failed",error);setStatus("비 음원 재생 대기","warn")}
}
function stopRain(){
  if(rainAudio){
    rainAudio.pause();
    rainAudio.currentTime=0;
    rainAudio=null;
  }
  if(rainNode){
    try{rainNode.stop()}catch(error){console.warn("Legacy rain stop failed",error)}
    rainNode.disconnect();
    rainNode=null;
    rainGain=null;
  }
}
async function playSfx(id){
  if(!id||settings.muted)return;await ensureAudio();
  const path=audioManifest.sfx[id];if(!path)return;
  const arr=await fetch(path,{cache:"no-store"}).then(r=>r.arrayBuffer());const buf=await audioCtx.decodeAudioData(arr);
  const src=audioCtx.createBufferSource();src.buffer=buf;src.connect(masterGain);src.start();
}
function setBackground(id){const path=backgrounds[id];if(path)$("#background-layer").style.backgroundImage=`linear-gradient(rgba(5,7,10,.18),rgba(5,7,10,.35)),url("${path}")`}
function setCharacter(cmd){
  if(!cmd)return;
  const slots=["left","center","right"];
  if(cmd.visible===false){slots.forEach(p=>$("#character-"+p).classList.remove("visible"));return}
  const c=characters[cmd.id];if(!c)return;
  const pos=cmd.position||c.defaultPosition||"center";
  const img=$("#character-"+pos);
  const src=c.assets[cmd.expression||c.defaultExpression];
  slots.filter(p=>p!==pos).forEach(p=>$("#character-"+p).classList.remove("visible"));
  if(img.dataset.src!==src){
    img.classList.remove("visible");
    img.onload=()=>{img.classList.add("visible");setStatus("캐릭터·배경·음향 준비 완료","ok")};
    img.onerror=()=>setStatus("캐릭터 이미지를 불러오지 못함","warn");
    img.src=src;img.dataset.src=src;img.alt=c.name;
  }else{
    img.classList.add("visible");
  }
}
function typeText(text){
  clearInterval(typeTimer);typing=true;fullText=text;dialogue.textContent="";let i=0;
  typeTimer=setInterval(()=>{dialogue.textContent+=text[i++]||"";if(i>=text.length){clearInterval(typeTimer);typing=false}},settings.textSpeed);
}
function saveAuto(){localStorage.setItem(AUTO_KEY,JSON.stringify({chapter:chapter.id,index,variables,updatedAt:new Date().toISOString()}))}
function jumpTo(id){const found=chapter.scenes.findIndex(s=>s.id===id);if(found>=0){index=found;render()}}
function renderChoice(scene){
  typing=false;speaker.style.display="none";dialogue.textContent="";
  const panel=$("#choice-panel");panel.innerHTML=`<h3>${scene.prompt}</h3>`;
  scene.choices.forEach(c=>{const b=document.createElement("button");b.textContent=c.label;b.onclick=()=>{variables={...variables,...(c.set||{})};panel.classList.add("hidden");jumpTo(c.next)};panel.appendChild(b)});
  panel.classList.remove("hidden");
}
function render(){
  const scene=chapter.scenes[index];if(!scene)return;
  setBackground(scene.background);setCharacter(scene.character);
  if(scene.ambient==="rain"&&settings.rain&&!settings.muted)startRain();
  if(scene.sfx)playSfx(scene.sfx);
  stage.classList.remove("shake","flash","memory");if(scene.effect){void stage.offsetWidth;stage.classList.add(scene.effect)}
  if(scene.type==="choice"){renderChoice(scene);saveAuto();return}
  speaker.textContent=scene.speaker||"";speaker.style.display=scene.speaker?"block":"none";typeText(scene.text);
  log.push({speaker:scene.speaker,text:scene.text});saveAuto();
}
function next(){
  if(!$("#choice-panel").classList.contains("hidden"))return;
  if(typing){clearInterval(typeTimer);dialogue.textContent=fullText;typing=false;return}
  if(index<chapter.scenes.length-1){index++;render()}else{clearInterval(autoTimer);autoTimer=null;showScreen("title")}
}
async function start(newGame){
  try{
    setStatus("데이터 로딩 중");
    await ensureAudio();
    await initData();
    loadSettings();
    setStatus(audioCtx?.state==="running"?"음향 활성화됨":"음향 대기 중",audioCtx?.state==="running"?"ok":"warn");
    if(newGame){index=0;variables={};log=[]}else{const s=JSON.parse(localStorage.getItem(AUTO_KEY)||"null");index=Math.min(s?.index||0,chapter.scenes.length-1);variables=s?.variables||{}}
    showScreen("novel");render()
  }catch(e){console.error(e);showScreen("novel");speaker.textContent="시스템";speaker.style.display="block";dialogue.textContent="게임 데이터를 불러오지 못했습니다. Live Server로 실행해 주세요."}
}
function openSlots(mode){
  saveMode=mode;$("#save-dialog-title").textContent=mode==="save"?"저장":"불러오기";
  const wrap=$("#save-slots");wrap.innerHTML="";
  for(let i=1;i<=3;i++){const data=JSON.parse(localStorage.getItem(SLOT_KEY+i)||"null");const row=document.createElement("div");row.className="save-slot";
    row.innerHTML=`<div><strong>슬롯 ${i}</strong><br><small>${data?`장면 ${data.index+1} · ${new Date(data.updatedAt).toLocaleString()}`:"빈 슬롯"}</small></div>`;
    const b=document.createElement("button");b.textContent=mode==="save"?"저장":"불러오기";b.disabled=mode==="load"&&!data;
    b.onclick=()=>{if(mode==="save"){localStorage.setItem(SLOT_KEY+i,JSON.stringify({index,variables,updatedAt:new Date().toISOString()}));openSlots("save")}
      else{index=data.index;variables=data.variables||{};$("#save-dialog").close();showScreen("novel");render()}};
    row.appendChild(b);wrap.appendChild(row)}
  $("#save-dialog").showModal()
}
bindClick("#new-game",()=>start(true));bindClick("#continue-game",()=>start(false));bindClick("#title-load",()=>openSlots("load"));bindClick("#title-settings",()=>$("#settings-dialog")?.showModal());
bindClick("#back-title",()=>{clearInterval(autoTimer);autoTimer=null;showScreen("title")});
$("#dialogue-box").onclick=next;$("#dialogue-box").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();next()}};
document.addEventListener("keydown",e=>{if(novel.classList.contains("active")&&(e.key==="Enter"||e.key==="ArrowRight"))next()});
$("#auto-btn").onclick=e=>{if(autoTimer){clearInterval(autoTimer);autoTimer=null;e.target.textContent="자동"}else{autoTimer=setInterval(()=>{if(!typing)next()},2800);e.target.textContent="자동 중지"}};
$("#log-btn").onclick=()=>{$("#log-list").innerHTML=log.map(x=>`<div class="log-item">${x.speaker?`<strong>${x.speaker}</strong>`:""}${x.text}</div>`).join("");$("#log-dialog").showModal()};
$("#save-btn").onclick=()=>openSlots("save");$("#load-btn").onclick=()=>openSlots("load");$("#settings-btn").onclick=()=>$("#settings-dialog").showModal();
$("#mute-btn").onclick=e=>{settings.muted=!settings.muted;e.target.textContent=settings.muted?"🔇":"🔊";applyVolume();if(settings.muted)stopRain();else if(settings.rain)startRain()};

$("#sound-test-btn").onclick=async()=>{
  try{
    await ensureAudio();
    await playSfx("thunder");
    if(settings.rain&&!settings.muted)await startRain();
    setStatus("소리 테스트 재생 중","ok");
  }catch(error){
    console.error(error);setStatus("소리 재생 실패","warn");
  }
};

document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$("#"+b.dataset.close).close());
$("#text-speed").oninput=saveSettings;$("#master-volume").oninput=saveSettings;$("#rain-toggle").onchange=saveSettings;
loadSettings();

if("serviceWorker" in navigator && ["localhost","127.0.0.1"].includes(location.hostname)){
  navigator.serviceWorker.getRegistrations().then(regs=>regs.forEach(r=>r.unregister()));
  caches.keys().then(keys=>keys.filter(k=>k.includes("cheonryugwan")).forEach(k=>caches.delete(k)));
}

document.addEventListener("DOMContentLoaded",()=>{
  document.documentElement.dataset.gameReady="v0.8.4.2";
  console.info("[천류관 게임] 버튼 이벤트 초기화 완료");
});
