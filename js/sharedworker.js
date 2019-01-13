/* SHARED WORKER SCRIPT */

onconnect = function(e) {
  var port = e.ports[0];
  port.onmessage = function(e) {
    port.postMessage("hi i'm a shared worker");
  }
}
