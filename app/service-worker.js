'use strict';

// This file is a stub where Workbox will inject the results of Gulp build process
importScripts('/scripts/service-worker/workbox.js');

const workboxSW = new WorkboxSW();

// Static precaching list, injected by the build
workboxSW.precache([
]);

// Workbox can intercept pushState changes and serve a static file, instead
// workboxSW.router.registerNavigationRoute(
//   'index.html', {
//     whitelist: [/./],
//     blacklist: [/images\/.*/, /\.(js|css)/],
//   }
// );

// Permit same domain resources to be cached locally, but refresh from network
// Permit everything except browser-sync
workboxSW.router.registerRoute(
  '/(.*)',
  workboxSW.strategies.networkFirst()
);

// Caching of external contents fails by default, hence create a new rule
const cacheOneWeekStrategy = workboxSW.strategies.cacheFirst({
  cacheName: 'cdn-cache',
  cacheExpiration: {
    maxEntries: 20,
    maxAgeSeconds: 7 * 24 * 60 * 60, // one week
  },
  cacheableResponse: {
    statuses: [0, 200],
  },
});

// Cache APIs in case they cannot be accessed online
const cacheFallbackStrategy = workboxSW.strategies.cacheFirst({
  cacheName: 'api-cache',
  cacheExpiration: {
    maxEntries: 20,
    maxAgeSeconds: 60 * 60, // one hour
  },
  cacheableResponse: {
    statuses: [0, 200],
  },
});

// Cache external fonts, including the fonts from Google CDN
workboxSW.router.registerRoute(
  'https://fonts.googleapis.com/css(.*)',
  cacheOneWeekStrategy
);
workboxSW.router.registerRoute(
  'https://fonts.gstatic.com/(.*)',
  cacheOneWeekStrategy
);

// Cache YLE API images
workboxSW.router.registerRoute(
  'http://images.cdn.yle.fi/image/upload/(.*)',
  cacheOneWeekStrategy
);

// Cache YLE API requests for rudimentary offline usage
 workboxSW.router.registerRoute(
  'https://external.api.yle.fi/v1/(.*)',
  cacheOneWeekStrategy
);

console.log('Service Worker generated alright');
