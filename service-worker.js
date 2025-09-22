const CACHE_NAME = 'organyze-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/homepage.html',
  '/account.html',
  '/style.css',
  '/script.js',
  '/signup.css',
  '/signup.js',
  '/homepage.css',
  '/homepage.js',
  '/account.css',
  '/account.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});