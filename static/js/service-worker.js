const CACHE_NAME = 'map-app-v1';
const ASSETS = [
	'/',
	'/static/css/styles.css',
	'/static/icons/logo2/icon_256x256.png',
	'/static/icons/logo2/icon_512x512.png'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});