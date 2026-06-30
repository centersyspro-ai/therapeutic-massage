const CACHE_NAME = 'reavital-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './assets/styles/main.css',
  './assets/js/script.js',
  './assets/images/logomasajes.jpg',
  './assets/images/terapeuta1.jpeg',
  './assets/images/terapeuta-dando-masaje1.png',
  './assets/images/masaje-espalda1.jpeg'
];

// Instalar el Service Worker y almacenar recursos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar y limpiar cachés antiguas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Estrategia de carga: Network First (cae en caché si no hay internet)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});