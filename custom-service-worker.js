

const addToCache = (event, fetchResponse) => {
  // Check if we received a valid response
  if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
    return fetchResponse;
  }

  // IMPORTANT: Clone the response. A response is a stream
  // and because we want the browser to consume the response
  // as well as the cache consuming the response, we need
  // to clone it so we have two streams.
  const responseToCache = fetchResponse.clone();

  caches.open('wdsCache').then((cache) => {
    cache.put(event.request, responseToCache);
  });

  return fetchResponse;
};

const fetchAndCache = (event, fetchRequest) => fetch(fetchRequest)
  .then(fetchResponse => addToCache(event, fetchResponse));

self.addEventListener('fetch', (event) => {
  // IMPORTANT: Clone the request. A request is a stream and
  // can only be consumed once. Since we are consuming this
  // once by cache and once by the browser for fetch, we need
  // to clone the response.
  const fetchRequest = event.request.clone();

  // Try to get files from the "assets" directory from cache first
  if (fetchRequest.url.indexOf('/assets/') >= 0) {
    event.respondWith(
      caches.match(fetchRequest)
        .then(response => response || fetchAndCache(event, fetchRequest)),
    );
  } else {
    event.respondWith(
      fetchAndCache(event, fetchRequest),
    );
  }

  const event = new Event('beforeinstallprompt')
    window.dispatchEvent(event)
    let deferredPrompt; // Variable should be out of scope of addEventListener method

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        deferredPrompt = e
    })

    const btnInstallApp = document.getElementById('btn-install-app')

    if (btnInstallApp) {
        btnInstallApp.click();
        btnInstallApp.addEventListener('click', e => {
            deferredPrompt.prompt()
            deferredPrompt.userChoice
                .then(choiceResult => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('user accepted A2HS prompt')
                    } else {
                        console.log('user dismissed A2HS prompt')
                    }
                    deferredPrompt = null
                })
        })
    }
});
self.addEventListener("message", (event) => {
  console.log("here skip===========================check");
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});