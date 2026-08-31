const CACHE='dijitaloptik-v3';
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

  /* Sayfa: ASLA önbellekten bayat çekme (no-store), düşerse offline kopya */
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

  /* pdf.js CDN vb.: önce önbellek, yoksa ağ+doldur */
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