'use strict';

// This file is a stub where Workbox will inject the results of Gulp build process
// Source modified from https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa-reader/src/sw.js
importScripts('/scripts/service-worker/workbox.js');

const workboxSW = new WorkboxSW({
  clientsClaim: true,
  skipWaiting: true
});

// Static precaching of images
workboxSW.precache([]);

// Register main route for all navigation links to pages
workboxSW.router.registerNavigationRoute('index.html', {
  whitelist: [/./],
  blacklist: [/images\/.*/, /\.(js|css)/]
});

// Cache external libraries and fonts
workboxSW.router.registerRoute('https:/fonts.googleapis.com/(.*)', workboxSW.strategies.cacheFirst());

// Make sure new versions of the Service Worker activate immediately
self.addEventListener('install', () => {
  self.skipWaiting();
});
