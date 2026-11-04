var CACHE="bajar-bondhu-v4";
var FILES=["./","./index.html","./manifest.json","./icon.svg","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}))});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(ch){ch.put(e.request,c)});return r}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match("./index.html")})}));
});
