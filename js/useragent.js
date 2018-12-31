/* TABLE: User Agent */

'use strict';

(() => {
  const FFImg = new Image();
  FFImg.src = "about:logo";
  FFImg.onload = e => {
    if (!dom.IsFF.textContent) dom.IsFF = "Firefox";
  };
  const TorImg = new Image();
  TorImg.src = "resource://normandy-content/about-studies/img/shield-logo.png";
  TorImg.onload = e => {
    dom.IsFF = "Tor Browser";
  };
})();

dom.nAppName = navigator.appName;
dom.nAppVersion = navigator.appVersion;
dom.nBuildID = navigator.buildID;
dom.nCodeName = navigator.appCodeName;
dom.nOscpu = navigator.oscpu;
dom.nPlatform = navigator.platform;
dom.nProduct = navigator.product;
dom.nProductSub = navigator.productSub;
dom.nUserAgent = navigator.userAgent;
