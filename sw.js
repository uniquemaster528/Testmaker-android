const CACHE='dijitaloptik-v2';
const CORE=['./tablet.html','./index.html','./manifest.json','./icon.svg','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;

  /* Sayfa gezintisi: önce ağ (güncellik), düşerse önbellek (offline) */
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request).then(r=>{
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put('./tablet.html',copy));
        return r;
      }).catch(()=>caches.match('./tablet.html'))
    );
    return;
  }

  /* Diğer her şey (pdf.js CDN dahil): önce önbellek, yoksa ağ+doldur */
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