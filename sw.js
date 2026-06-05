// sw.js - D4rkEcho MD PWA Service Worker
const CACHE_NAME = 'd4rkecho-md-v1';
const urlsToCache = [
  '/',
  '/dashboard',
  '/pair',
  '/config',
  '/offline.html',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
  // Ikiwa una picha ya menu kali au logo, ongeza hapa
];

// Tukio la usakinishaji
self.addEventListener('install', event => {
  console.log('[D4rkEcho MD SW] Inasakinisha...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[D4rkEcho MD SW] Inaweka akiba...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Tukio la kuamsha (activate)
self.addEventListener('activate', event => {
  console.log('[D4rkEcho MD SW] Inaamsha...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[D4rkEcho MD SW] Inafuta cache ya zamani:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Tukio la kuomba rasilimali (fetch)
self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // Ruhusu API za msingi zisihifadhiwe kwenye cache (kuepuka migogoro ya session na data za wakati halisi)
  const skipAPIs = [
    '/api/', '/code', '/status', '/active', '/disconnect', '/connect-all',
    '/pair', '/session', '/newsletter', '/history', '/clean'
  ];
  
  if (skipAPIs.some(api => url.includes(api))) {
    console.log('[D4rkEcho MD SW] Inaruka API:', url);
    return; // Usiingilie, endelea kwa mtandao
  }
  
  // Ruhusu chaneli ya newsletter (ikiwa inahitaji kuwa hai, isicache)
  if (url.includes('120363426538840090@newsletter')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        // Hifadhi tu majibu yaliyofaulu na ya aina ya "basic" (asili sawa)
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Ikiwa mtandao haupo na ombi ni la ukurasa wa HTML, rudisha ukurasa wa offline
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }
      });
    })
  );
});
