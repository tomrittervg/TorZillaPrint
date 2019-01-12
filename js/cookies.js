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

// cookie supported
dom.nCookieEnabled = navigator.cookieEnabled;

// cookie test
var rndCname = Math.random().toString(36).substring(2, 15);
var rndCvalue = Math.random().toString(36).substring(2, 15);
document.cookie = rndCname+"="+rndCvalue;
var cUser =  getCookie(rndCname);
if (cUser != ""){dom.cookieSession="yes"} else { dom.cookieSession="no"};

// localStorage test
var rndSname = Math.random().toString(36).substring(2, 15);
var rndSvalue = Math.random().toString(36).substring(2, 15);
var domLS = "";
try {localStorage.setItem(rndSname, rndSvalue);
  if(!localStorage.getItem(rndSname)) {domLS="no"} else {domLS="yes"};}
catch(err) {domLS = "no"};
dom.storageLocalTest = domLS;

// sessionStorage test
var rndSname = Math.random().toString(36).substring(2, 15);
var rndSvalue = Math.random().toString(36).substring(2, 15);
var domSS = "";
try {sessionStorage.setItem(rndSname, rndSvalue);
  if(!sessionStorage.getItem(rndSname)) {domSS="no"} else {domSS="yes"};}
catch(err) {domSS = "no"};
dom.storageSessionTest = domSS;

// indexedDB supported
try {if (!window.indexedDB) {dom.IDBSupported="no"} else {dom.IDBSupported="yes"};}
catch(err) {dom.IDBSupported="no"};

// indexedDB test
var rndIDB = Math.random().toString(36).substring(2, 15);
try {
  var requestIDB = indexedDB.open(rndIDB);
  requestIDB.onerror = function() {dom.IDBTest = "no"};
  requestIDB.onsuccess = function() {
    // success, now store some data and read it back
    dom.IDBTest="yes, but more tests to come";
    };}
catch(err) {dom.IDBTest = "no"};

// appCache: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
// window.applicationCache.status == 2

// workers supported
if (typeof(Worker) !== "undefined") {dom.workerSupported="yes"} else {dom.workerSupported="no"};
