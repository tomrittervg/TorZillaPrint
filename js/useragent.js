
/* TABLE: User Agent */

function checkImage(imageSrc, imageMsg) {
    var img = new Image();
    img.src = imageSrc;
    img.onload = function(){ document.getElementById("IsFF").innerHTML = imageMsg};
}

checkImage("about:logo", "Firefox");

document.getElementById("nAppName").innerHTML = navigator.appName;
document.getElementById("nAppVersion").innerHTML = navigator.appVersion;
document.getElementById("nBuildID").innerHTML = navigator.buildID;
document.getElementById("nCodeName").innerHTML = navigator.appCodeName;
document.getElementById("nOscpu").innerHTML = navigator.oscpu;
document.getElementById("nPlatform").innerHTML = navigator.platform;
document.getElementById("nProduct").innerHTML = navigator.product;
document.getElementById("nProductSub").innerHTML = navigator.productSub;
document.getElementById("nUserAgent").innerHTML = navigator.userAgent;

// don't run immediately after about:logo image check
checkImage("resource://normandy-content/about-studies/img/shield-logo.png", "Tor Browser");
