// Apex Fusion — Network-Centric Service Worker (Local-First Caching & Offline Resilience)

const CACHE_NAME = 'apex-fusion-network-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/concepts/physics_optics_3d.jpg',
  '/concepts/physics_elec_3d.jpg',
  '/concepts/math_trig_3d.jpg',
  '/concepts/math_algebra_3d.jpg',
  '/concepts/chem_molecules_3d.jpg',
  '/concepts/chem_acids_metal_3d.jpg',
  '/concepts/bio_heart_3d.jpg',
  '/concepts/bio_genetics_3d.jpg',
  '/concepts/sst_history_geo_3d.jpg',
  '/concepts/eng_lit_3d.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => console.warn('Cache pre-fetch warning:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Network-First with Cache Fallback for dynamic pages; Cache-First for 3D assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-First for static concept art and fonts
  if (url.pathname.startsWith('/concepts/') || url.pathname.includes('katex')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Network-First for API and pages
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
