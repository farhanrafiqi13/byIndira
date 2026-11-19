const CACHE_NAME = 'v2-bypass-cache';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=2.1-unfrozen',
  './sheetApi.js?v=2.1-unfrozen',
  './app.js?v=2.1-unfrozen',
  './manifest.json',
  './logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url || '';
  // Jangan pernah cache request ke Google Apps Script agar selalu live
  if (url.indexOf('script.google.com') !== -1 || url.indexOf('googleusercontent.com') !== -1) {
    event.respondWith(fetch(event.request));
    return;
  }
  // Network-first untuk seluruh file agar update aplikasi langsung tampil tanpa nyangkut
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
