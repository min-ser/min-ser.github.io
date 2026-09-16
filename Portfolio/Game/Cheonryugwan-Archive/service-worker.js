const CACHE='cheonryugwan-site-v0.9.8.9.1';
const ASSETS=[
  './','./index.html','./assets/css/common.css','./assets/css/home.css',
  './assets/js/common.js','./pages/archive/','./pages/story/',
  './pages/characters/','./pages/world/','./pages/roadmap/','./pages/about/'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
