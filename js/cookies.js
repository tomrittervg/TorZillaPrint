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
document.cookie = rndCname+"="+rndCvalue;
var cUser =  getCookie(rndCname);
if (cUser != ""){ dom.cookieSession="yes" } else { dom.cookieSession="no" };

// permanent cookie
rndCname = Math.random().toString(36).substring(2, 15);
rndCvalue = Math.random().toString(36).substring(2, 15);
// to do: set it for 5 minutes, attempt to read it back and if it's there, delete it

// localStorage and sessionStorage
var domLS = "";
var domSS = "";
(function() {
  try { localStorage.test = "test"; sessionStorage.test = "test";} catch (ex) {}
    try {domLS = "";
      if (localStorage.test == "test") {domLS = "yes";} else {domLS = "no";}}
    catch (ex) {domLS = "no";}
    try {domSS = "";
      if (sessionStorage.test == "test") {domSS = "yes";} else {domSS = "no";}}
    catch (ex) {domSS = "no";};
})();
dom.storageLocal = domLS;
dom.storageSession = domSS;
