/* TABLE:  Cookies & Storage */

'use strict';

// functions
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {c = c.substring(1);}
    if (c.indexOf(name) == 0) {return c.substring(name.length, c.length);}
  }
  return "";
};

// cookie support
if (navigator.cookieEnabled == true) {dom.nCookieEnabled="enabled"}
  else {dom.nCookieEnabled="disabled"};
// cookie test
var rndCname = Math.random().toString(36).substring(2, 15);
var rndCvalue = Math.random().toString(36).substring(2, 15);
document.cookie = rndCname+"="+rndCvalue;
var cUser =  getCookie(rndCname);
if (cUser != ""){dom.cookieTest="yes"} else { dom.cookieTest="no"};

// localStorage support
try {if (typeof(localStorage) != "undefined") {dom.storageLSupport="enabled"}
     else {dom.storageLSupport="disabled: undefined"};}
catch(err) {dom.storageLSupport="disabled: catch(err)"};
// localStorage test
var rndSname = Math.random().toString(36).substring(2, 15);
var rndSvalue = Math.random().toString(36).substring(2, 15);
var domLS = "";
try {localStorage.setItem(rndSname, rndSvalue);
  if(!localStorage.getItem(rndSname)) {domLS="no"} else {domLS="yes"};}
catch(err) {domLS = "no: catch(err)"};
dom.storageLTest = domLS;

// sessionStorage support
try {if (typeof(sessionStorage) != "undefined") {dom.storageSSupport="enabled"}
     else {dom.storageSSupport="disabled: undefined"};}
catch(err) {dom.storageSSupport="disabled: catch(err)"};
// sessionStorage test
var rndSname = Math.random().toString(36).substring(2, 15);
var rndSvalue = Math.random().toString(36).substring(2, 15);
var domSS = "";
try {sessionStorage.setItem(rndSname, rndSvalue);
  if(!sessionStorage.getItem(rndSname)) {domSS="no"} else {domSS="yes"};}
catch(err) {domSS = "no: catch(err)"};
dom.storageSTest = domSS;

// indexedDB support
try {if (!window.indexedDB) {dom.IDBSupport="disabled"} else {dom.IDBSupport="enabled"};}
catch(err) {dom.IDBSupport="disabled: catch(err)"};
// indexedDB test
var rndIDB = Math.random().toString(36).substring(2, 15);
try {
  var requestIDB = indexedDB.open(rndIDB);
  requestIDB.onerror = function() {dom.IDBTest = "no: onerror"};
  requestIDB.onsuccess = function() {
    // success, now store some data and read it back
    dom.IDBTest="yes: test to come";
    };}
catch(err) {dom.IDBTest = "no: catch(err)"};

// appCache support
var appCS = "";
if ("applicationCache" in window) {appCS="enabled"} else {appCS="disabled"};
dom.appCacheSupport = appCS;
// appCache test
// https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
// window.applicationCache.status == 2
if (appCS == "enabled"){
    dom.appCacheTest="yes: test to come"
   }
else {dom.appCacheTest="no"};

// worker support
if (typeof(Worker) !== "undefined") {dom.workerSupport="enabled"} else {dom.workerSupport="disabled"};

// web worker test
var wwTest = "unknown"; var wwt;
if (typeof(Worker) !== "undefined") {
  wwt = new Worker("worker.js");
  wwt.onmessage = wwTest="yes";
  wwt.terminate();
  }
else {wwTest = "no"};
dom.webWTest = wwTest;

// shared worker test
if ((location.protocol) !== "file:") {
  var swTest = "unknown"; var swt;
  if (typeof(Worker) !== "undefined") {
    try {
      swt = new SharedWorker("workershared.js");
      swt.port.start();
      swt.port.postMessage("are you there");
      swt.port.onmessage = swTest="yes";
    }
    catch(err) {swTest = "no: catch(err)"};
    }
  else {swTest = "no"};
  dom.sharedWTest = swTest;
};

// service worker support
if ((location.protocol) !== "file:") {
  var swSupport = "";
  if ('serviceWorker' in navigator) {swSupport="enabled"} else {swSupport="disabled"};
  dom.serviceWSupport = swSupport;
  // service worker test
  if (swSupport == "enabled"){
      dom.serviceWTest="yes: test to come"
     }
  else {dom.serviceWTest="no"};
};

// service worker cache (dom.caches.enabled)
if ((location.protocol) !== "file:") {
  // support
  if (swSupport == "enabled"){
      dom.serviceWCacheSupport="sw supported but dom.caches.enabled not checked"
     }
  else {dom.serviceWCacheSupport="no"};
  // test
  if (swSupport == "enabled"){
      dom.serviceWCacheTest="sw supported but dom.caches.enabled not checked"
     }
  else {dom.serviceWCacheTest="no"};
};

// notifications / push
navigator.permissions.query({name:"notifications"}).then(e => dom.pNotifications=e.state);
navigator.permissions.query({name:"push"}).then(e => dom.pPush=e.state);

// storage manager support (dom.storageManager.enabled)
var smSupport= "";
if ("storage" in navigator) {smSupport="enabled"} else {smSupport="disabled"};
dom.storageMSupport = smSupport;
// storage manager properties
if ((location.protocol) !== "file:") {
  if (smSupport == "enabled") {
    try {
      // this persistence test is slightly quirky
      // 1. In FF it prompts, in TB it doesn't (no global pref)
      // 2. In FF60+ if you allowed it, it remembers that (you need to clear site data to test for not persistent)
      // 3. In TB it always returns not persistent
      navigator.storage.persist().then(function(persistent) {
        if (persistent) dom.storageMProp = "not persistent";
        else dom.storageMProp = "persistent";
        navigator.storage.estimate().then(estimate => {
          dom.storageMProp.textContent += ` (${estimate.usage} of ${estimate.quota} bytes)`;
        });
      });
    }
    catch (err) {dom.storageMProp = "no: catch(err)"};
  }
  else {dom.storageMProp = "no"};
};
// storage manager test
if ((location.protocol) !== "file:") {
  if (smSupport == "enabled") {
    try {
      // store some data, get usage/quota
      dom.storageMTest = "yes: test to come"
    }
    catch (err) {dom.storageMTest = "no: catch(err)"};
  }
  else {dom.storageMTest = "no"};
};
// permission persistent-storage
navigator.permissions.query({name:"persistent-storage"}).then(e => dom.pPersistentStorage=e.state);

// storage access support (dom.storage_access.enabled)
// FF65+ https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API
// this is for embedded cross-origin content
try {Document.hasStorageAccess().then(e => e.state);
      //console.log("enabled");
    }
catch (err) { };
// storage access test: use Document.requestStorageAccess()
