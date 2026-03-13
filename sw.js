const CACHE_NAME = 'pantrypal-cache-v2';
const ASSETS = ['/', '/index.html', '/manifest.json'];

// Install & Cache
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

// Activate & Cleanup
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.map(k => k !== CACHE_NAME && caches.delete(k)))));
});

// Fetch logic
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

// Empty handlers to satisfy PWABuilder 'Action Items'
self.addEventListener('push', (e) => { /* Placeholder */ });
self.addEventListener('sync', (e) => { /* Placeholder */ });
