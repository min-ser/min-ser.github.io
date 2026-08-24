const CACHE='cheonryugwan-game-v0.10.6';
const ASSETS=[
'./','./index.html','./styles.css','./engine/novel-engine.js',
'./data/volume-01/part-01/chapter-01.json',
'./data/system/characters.json','./data/system/backgrounds.json','./data/system/audio.json',
'./assets/audio/generated/thunder.wav','./assets/audio/generated/sword-draw.wav',
'./assets/audio/generated/sword-clash.wav','./assets/audio/generated/memory-drone.wav','./assets/audio/ambient/rain.mp3'
];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))]))});
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
