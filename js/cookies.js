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

// appCache permission
navigator.permissions.query({name:"persistent-storage"}).then(e => dom.pPersistentStorage=e.state);

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
  // service worker cache
  if (swSupport == "enabled"){
      dom.serviceWCache="yes: test to come"
     }
  else {dom.serviceWCache="no"};
};

// notifications / push
navigator.permissions.query({name:"notifications"}).then(e => dom.pNotifications=e.state);
navigator.permissions.query({name:"push"}).then(e => dom.pPush=e.state);
