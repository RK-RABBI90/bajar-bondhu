var CACHE="bajar-bondhu-v5";
var FILES=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));
  self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}));
  }).then(function(){return self.clients.claim()}));
});
self.addEventListener("fetch",function(e){
  var req=e.request,url=new URL(req.url);
  if(req.method!=="GET"||url.origin!==location.origin)return; /* শুধু নিজের ফাইল হ্যান্ডেল করব */
  e.respondWith(
    fetch(req).then(function(r){
      if(r&&r.ok){var c=r.clone();caches.open(CACHE).then(function(ch){return ch.put(req,c)}).catch(function(){})}
      return r;
    }).catch(function(){
      return caches.match(req).then(function(m){
        if(m)return m;
        if(req.mode==="navigate")return caches.match("./index.html");
        return Response.error();
      });
    })
  );
});
