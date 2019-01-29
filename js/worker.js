/* WORKER SCRIPT */

'use strict';

self.addEventListener('message', function(e) => {
  console.log("web worker data recieved from main thread: (event) " + e.data);
  self.postMessage(e.data);
}, false);

this.onmessage = function() {
  console.log("web worker data recieved from main thread: (onmessage) " + e.data);
  postMessage(e.data);
};
