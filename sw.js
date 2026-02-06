const CACHE_NAME = 'keenan-portfolio-v1';

// List of core assets to cache for fast, reliable loads
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/index-PoKdlDKJ.js',
  '/assets/index-CYDCWLTg.css',
  '/manifest.webmanifest',
  '/assets/favicon-32x32-DbTp51G8.png',
  '/assets/apple-touch-icon-BucV0AfS.png',
  '/favicons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Offline-friendly strategy:
// - Navigations: network-first with cached index.html fallback
// - Static assets (JS/CSS/images/fonts): cache-first with background update
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Handle SPA navigations
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // Static assets: cache-first
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        });
      })
    );
  }
});
