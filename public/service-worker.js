// Cache
const CACHE_NAME = "v1";
const CACHE_FILES = [
  "/",
  "/index.html",
  "/index.js",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Install Event
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("service worker Caching Files");
        cache.addAll(CACHE_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
  //   Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});