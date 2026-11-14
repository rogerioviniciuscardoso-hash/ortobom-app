const VERSION='promotor-ortobom-v72';
const SHELL=['./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(VERSION);await Promise.allSettled(SHELL.map(path=>cache.add(path)));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('promotor-ortobom-')&&key!==VERSION)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET')return;
 if(req.mode==='navigate'&&url.origin===self.location.origin){
  event.respondWith((async()=>{const cache=await caches.open(VERSION);try{const response=await fetch(req,{cache:'no-store'});if(response.ok)await cache.put('./index.html',response.clone());return response}catch{const saved=await cache.match('./index.html');return saved||Response.error()}})());return;
 }
 if(url.origin===self.location.origin&&SHELL.some(p=>url.pathname.endsWith(p.slice(1)))){
  event.respondWith((async()=>{const cache=await caches.open(VERSION);return await cache.match(req)||fetch(req)})());return;
 }
 if(url.hostname==='esm.sh'){
  event.respondWith((async()=>{const cache=await caches.open(VERSION);try{const response=await fetch(req);if(response.ok||response.type==='opaque')await cache.put(req,response.clone());return response}catch{return await cache.match(req)||Response.error()}})());return;
 }
});