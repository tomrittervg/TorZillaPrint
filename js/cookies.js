/* TABLE:  Cookies & Storage */

'use strict';

// functions
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

dom.nCookieEnabled = navigator.cookieEnabled;

// session cookie
var rndCname = Math.random().toString(36).substring(2, 15);
var rndCvalue = Math.random().toString(36).substring(2, 15);
//console.log("-----new test------");
//console.log(" random name cookie: "+rndCname);
//console.log("random value cookie: "+rndCvalue);
document.cookie = rndCname+"="+rndCvalue;
var cUser =  getCookie(rndCname);
if (cUser != ""){
  dom.cookieSession="yes";
  //console.log("read cookie value: "+getCookie(rndCname) );
  }
else { dom.cookieSession="no" };

// localStorage
var rndSname = Math.random().toString(36).substring(2, 15);
var rndSvalue = Math.random().toString(36).substring(2, 15);
//console.log(" random name LS: "+rndSname);
//console.log("random value LS: "+rndSvalue);
var domLS = "";
// setItem & getItem
try {
  localStorage.setItem(rndSname, rndSvalue);
  //console.log("setItem LS: "+rndSname+" , "+rndSvalue);
  // getItem
  if(!localStorage.getItem(rndSname)) {domLS="no"}
  else {
    domLS="yes";
    //console.log("getItem LS: "+ localStorage.getItem(rndSname));
  };
}
catch(err) {domLS = "no";};
dom.storageLocalTest = domLS;

// sessionStorage
var rndSname = Math.random().toString(36).substring(2, 15);
var rndSvalue = Math.random().toString(36).substring(2, 15);
//console.log(" random name SS: "+rndSname);
//console.log("random value SS: "+rndSvalue);
var domSS = "";
// setItem & getItem
try {
  sessionStorage.setItem(rndSname, rndSvalue);
  //console.log("setItem SS: "+rndSname+" , "+rndSvalue);
  // getItem
  if(!sessionStorage.getItem(rndSname)) {domSS="no"}
  else {
    domSS="yes";
    //console.log("getItem SS: "+ sessionStorage.getItem(rndSname));
  };
}
catch(err) {domSS = "no";};
dom.storageSessionTest = domSS;

// indexedDB

// appCache: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
// window.applicationCache.status == 2

// workers
if (typeof(Worker) !== "undefined") {dom.workerSupported="yes"} else {dom.workerSupported="no"};
