// Service Worker to intercept and block certain network traffic
self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    const url = new URL(event.request.url);
    
    // Example of domains to block - customize this list as needed
    const blockedDomains = [
      'analytics', 'tracker', 'tracking', 
      'ads', 'advertisement', 'metrics',
      'google-analytics', 'googletagmanager', 
      'facebook.net', 'facebook.com/tr',
      'doubleclick.net'
      // Add more domains you want to block
    ];
    
    // Check if the request hostname contains any blocked terms
    const shouldBlock = blockedDomains.some(domain => 
      url.hostname.includes(domain) || url.pathname.includes(domain)
    );
    
    if (shouldBlock) {
      console.log('Blocked request to:', url.toString());
      // Return empty response for blocked requests
      event.respondWith(new Response('', {
        status: 403,
        statusText: 'Blocked by service worker'
      }));
    } else {
      // Allow all other requests to proceed normally
      event.respondWith(fetch(event.request));
    }
  });
