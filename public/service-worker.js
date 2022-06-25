var cacheName = 'v1.0';

var cacheAssets = ['index.html', 'about.html', '/js/main.js', '/css/style.css'];

// installation
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});
