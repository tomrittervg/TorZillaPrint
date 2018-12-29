
/* TABLE: User Agent */

document.getElementById("nAppName").innerHTML = navigator.appName;
document.getElementById("nAppVersion").innerHTML = navigator.appVersion;
document.getElementById("nBuildID").innerHTML = navigator.buildID;
document.getElementById("nCodeName").innerHTML = navigator.appCodeName;
document.getElementById("nOscpu").innerHTML = navigator.oscpu;
document.getElementById("nPlatform").innerHTML = navigator.platform;
document.getElementById("nProduct").innerHTML = navigator.product;
document.getElementById("nProductSub").innerHTML = navigator.productSub;
document.getElementById("nUserAgent").innerHTML = navigator.userAgent;

function IsFirefox(){document.getElementById("IsFF").innerHTML = "Firefox"};
