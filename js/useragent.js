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
