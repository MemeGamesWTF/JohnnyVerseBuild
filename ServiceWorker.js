const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/8592eed29469db2fb6c25c4858fc7ca0.loader.js",
    "Build/a56a9e79ba3b363e4d30f965921c8f61.framework.js",
    "Build/5ffe9cec4fc92ef83f8efe27f1b60d7e.data",
    "Build/edd2704d3def49270b923f1343ba586d.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
