const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/3db7f1aac975c0d4be3b65a65edf23a5.loader.js",
    "Build/a56a9e79ba3b363e4d30f965921c8f61.framework.js",
    "Build/6a4d1d31ef6267f6b69363b1615104e1.data",
    "Build/a16d64b0c124c854d52a80a63407111e.wasm",
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
