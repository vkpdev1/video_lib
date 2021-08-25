self.addEventListener('fetch', (event) => {
});
self.addEventListener("message", (event) => {
  console.log("here skip===========================check");
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

if ( window.addToHomescreen ) { 
  ath = addToHomescreen( { 
  onCanInstall: function ( platform, _instance ) { 
  //run any on screen prompting logic from here 
  },
  onBeforeInstallPrompt: function ( platform ) { 
  //this triggers in response to the browser triggering the beforeInstallPrompt event 
  console.log( "native prompt: ", platform ); 
  }
  } ); 
 }