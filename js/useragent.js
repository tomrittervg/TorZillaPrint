/* TABLE: User Agent */

'use strict';

function checkImage(imageSrc, imageMsg) {
    var img = new Image();
    img.src = imageSrc;
    img.onload = function() {dom.IsFF.val = imageMsg};
}

checkImage("about:logo", "Firefox");

dom.nAppName.val = navigator.appName;
dom.nAppVersion.val = navigator.appVersion;
dom.nBuildID.val = navigator.buildID;
dom.nCodeName.val = navigator.appCodeName;
dom.nOscpu.val = navigator.oscpu;
dom.nPlatform.val = navigator.platform;
dom.nProduct.val = navigator.product;
dom.nProductSub.val = navigator.productSub;
dom.nUserAgent.val = navigator.userAgent;

// don't run immediately after about:logo image check
checkImage("resource://normandy-content/about-studies/img/shield-logo.png", "Tor Browser");
