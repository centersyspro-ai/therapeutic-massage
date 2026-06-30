const CACHE_NAME = 'reavital-cache-v1';
const ASSETS = [
  './',
  './index.html'
];

// Instalar el Service Worker y almacenar los recursos básicos
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

// Estrategia Stale-While-Revalidate (Carga rápido desde caché, pero actualiza de fondo)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      if (cachedResponse) {
        // Devolvemos la copia en caché de inmediato, pero buscamos en la red por si cambió
        fetch(e.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, networkResponse));
          }
        }).catch(() => {/* Ignorar errores de red de fondo */});
        
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});
