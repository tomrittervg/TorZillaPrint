/* TABLE:  Cookies & Storage */

'use strict';

// functions
function getCookie(cname) {
  var name = cname + "="; var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {c = c.substring(1);}
    if (c.indexOf(name) == 0) {return c.substring(name.length, c.length);}
  }
  return "";
};
function rndString() {return Math.random().toString(36).substring(2, 15);};
var rndStr = "";

// cookie support
if (navigator.cookieEnabled == true) {dom.nCookieEnabled="enabled"} else {dom.nCookieEnabled="disabled"};
// cookie test
rndStr = rndString(); document.cookie = rndStr+"="+rndStr;
if (getCookie(rndStr) != ""){dom.cookieTest="yes"} else { dom.cookieTest="no"};

// localStorage support
try {
  if (typeof(localStorage) != "undefined") {dom.storageLSupport="enabled";}
  else {dom.storageLSupport="disabled: undefined"};}
catch(e) {dom.storageLSupport="disabled: " + e.name};
// localStorage test
rndStr = rndString();
try {localStorage.setItem(rndStr, rndStr);
  if(!localStorage.getItem(rndStr)) {dom.storageLTest="no"} else {dom.storageLTest="yes"};}
catch(e) {dom.storageLTest="no: " + e.name};

// sessionStorage support
try {
  if (typeof(sessionStorage) != "undefined") {dom.storageSSupport="enabled"}
  else {dom.storageSSupport="disabled: undefined"};}
catch(e) {dom.storageSSupport="disabled: " + e.name};
// sessionStorage test
rndStr = rndString();
try {sessionStorage.setItem(rndStr, rndStr);
  if(!sessionStorage.getItem(rndStr)) {dom.storageSTest="no"} else {dom.storageSTest="yes"};}
catch(e) {dom.storageSTest="no: " + e.name};

// indexedDB support
try {if (!window.indexedDB) {dom.IDBSupport="disabled"} else {dom.IDBSupport="enabled"};}
catch(e) {dom.IDBSupport="disabled: " + e.name};
// indexedDB test
rndStr = rndString();
try {
  var requestIDB = indexedDB.open(rndStr);
  requestIDB.onerror = function() {dom.IDBTest = "no: onerror"};
  requestIDB.onsuccess = function() {
    // success, now store some data and read it back
    dom.IDBTest="yes: test to come";
  };}
catch(e) {dom.IDBTest="no: " + e.name};

// appCache support
if ("applicationCache" in window) {
  dom.appCacheSupport="enabled";
  // appCache test
  dom.appCacheTest="yes: test to come";}
else {dom.appCacheSupport="disabled"; dom.appCacheTest="no"};

// worker support
if (typeof(Worker) !== "undefined") {
  dom.workerSupport="enabled";
  // web worker test
  var wwt;
  try {
    wwt = new Worker("worker.js");
    wwt.onmessage = dom.webWTest="yes";
    wwt.terminate();}
  catch(e) {dom.webWTest="no: " + e.name};
  // shared worker test
  if ((location.protocol) !== "file:") {
    var swt;
    try {
      swt = new SharedWorker("workershared.js");
      swt.port.start();
      swt.port.postMessage("are you there");
      swt.port.onmessage = dom.sharedWTest="yes";}
    catch(e) {dom.sharedWTest="no: " + e.name};
  }
  else {dom.sharedWTest="no: file://"};
}
else {dom.workerSupport="disabled"; dom.webWTest="no"; dom.sharedWTest="no"};

// service worker support
if ((location.protocol) === "https:") {
  if ('serviceWorker' in navigator) {
    dom.serviceWSupport="enabled";
    // service worker test
    dom.serviceWTest="yes: test to come"
    // service worker cache support (dom.caches.enabled)
    dom.serviceWCacheSupport="dom.caches.enabled to check"
    // service cache test
    dom.serviceWCacheTest="dom.caches.enabled to check"
    // notifications support (dom.webnotifications.serviceworker.enabled)
    dom.notificationsSupport="dom.webnotifications.serviceworker.enabled to check"
    // notifications test
    dom.notificationsTest="dom.webnotifications.serviceworker.enabled to check"
  }
  else {dom.serviceWSupport="disabled"; dom.serviceWTest="no";
    dom.serviceWCacheSupport="no"; dom.serviceWCacheTest="no";
    dom.notificationsSupport="no"; dom.notificationsTest="no"};
}
else {var swMsg="no: insecure context"; dom.serviceWSupport=swMsg; dom.serviceWTest=swMsg;
  dom.serviceWCacheSupport=swMsg; dom.serviceWCacheTest=swMsg;
  dom.notificationsSupport=swMsg; dom.notificationsTest=swMsg};

// permissions notifications / push
navigator.permissions.query({name:"notifications"}).then(e => dom.pNotifications=e.state);
navigator.permissions.query({name:"push"}).then(e => dom.pPush=e.state);

// storage manager support (dom.storageManager.enabled)
if ("storage" in navigator) {
  dom.storageMSupport="enabled"
  // don't test local
  if ((location.protocol) !== "file:") {
    // storage manager properties
    try {
      navigator.storage.persist().then(function(persistent) {
        if (persistent) dom.storageMProp="persistent";
        else dom.storageMProp="not persistent";
        navigator.storage.estimate().then(estimate => {
          dom.storageMProp.textContent += ` (${estimate.usage} of ${estimate.quota} bytes)`;
        });
      });
    }
    catch(e) {dom.storageMProp="no: " + e.name};
    // storage manager test
    try {
      // store some data, get usage/quota
      dom.storageMTest="yes: test to come"
    }
    catch(e) {dom.storageMTest="no: " + e.name};
  };
}
else {dom.storageMSupport="disabled"; dom.storageMProp="no"; dom.storageMTest="no"};

// permission persistent-storage
navigator.permissions.query({name:"persistent-storage"}).then(e => dom.pPersistentStorage=e.state);

// storage access support (dom.storage_access.enabled)
// FF65+ https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API
// this is for embedded cross-origin content
try {Document.hasStorageAccess().then(e => e.state);
      //console.log("enabled");
    }
catch(e) { };
// storage access test: use Document.requestStorageAccess()
