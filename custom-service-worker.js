
self.addEventListener('fetch', function(event) {})
self.addEventListener("message", (event) => {
  console.log("here skip===========================check");
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
