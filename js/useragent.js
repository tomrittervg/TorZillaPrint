/* TABLE: User Agent */

'use strict';

(() => {
  const FFImg = new Image();
  FFImg.src = "about:logo";
  FFImg.onload = e => {
    if (!dom.fdResource.textContent) dom.fdResource = "Firefox";
  };
  const TorImg = new Image();
  TorImg.src = "resource://normandy-content/about-studies/img/shield-logo.png";
  TorImg.onload = e => {
    dom.fdResource = "Firefox";
  };
})();

if (isNaN(window.mozPaintCount) === false){ dom.fdPaintCount="Firefox"};
/* feature detection: we don't need to do all of these
if (isNaN(window.mozInnerScreenX) === false){ dom.fdScreenX="Firefox"};
if (isNaN(window.window.scrollMaxX) === false){ dom.fdScrollMaxX="Firefox"};
if (navigator.oscpu == undefined){} else { dom.fdOscpu="Firefox"};
*/

dom.nAppName = navigator.appName;
dom.nAppVersion = navigator.appVersion;
dom.nBuildID = navigator.buildID;
dom.nCodeName = navigator.appCodeName;
dom.nOscpu = navigator.oscpu;
dom.nPlatform = navigator.platform;
dom.nProduct = navigator.product;
dom.nProductSub = navigator.productSub;
dom.nUserAgent = navigator.userAgent;

/* Firefox Version 60+ Detection */
function getVerNo(){
  //59 or lower
  var verNo = "59 or lower...";
  //60
  try {(Object.getOwnPropertyDescriptor(Document.prototype, "body")
    || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "body")).get.call((new DOMParser).parseFromString(
      "<html xmlns='http://www.w3.org/1999/xhtml'><body/></html>","application/xhtml+xml")) !== null; verNo="60";}
  catch(err) {};
  //61
  var str61=" blah";
  try {str61 = str61.trimStart(); verNo="61"} catch(err) {};
  //62
  console.time("ver62");
  try {console.timeLog("ver62"); verNo="62"} catch(err) {};
  console.timeEnd("ver62");
  //63
  if (Symbol.for(`foo`).description == "foo"){ verNo="63"};
  //64
  if (window.screenLeft == undefined){} else { verNo="64"};
  //65
  try {const rtf = new Intl.RelativeTimeFormat("en", {style: "long",}); verNo="65+"} catch(err) {};
  // reminder: ^^ always append + ONLY on the LAST test
  return verNo;
  };
// only run the function for Firefox
if (isNaN(window.mozInnerScreenX) === false){dom.versionNo = getVerNo();}
