const CACHE='dijitaloptik-v4';
const CORE=['./tablet.html','./manifest.json','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{}))))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;

  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request,{cache:'no-store'}).then(r=>{
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put('./tablet.html',copy));
        return r;
      }).catch(()=>caches.match('./tablet.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(hit=>
      hit || fetch(e.request).then(r=>{
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return r;
      }).catch(()=>hit)
    )
  );
});