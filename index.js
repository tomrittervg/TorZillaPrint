/* TABLE 1: Screen Information */

// Test DPI
var devicePixelRatio = window.devicePixelRatio || 1;
dpi_x = Math.round(document.getElementById('testdpi').offsetWidth * devicePixelRatio);
dpi_y = Math.round(document.getElementById('testdpi').offsetHeight * devicePixelRatio);
document.getElementById("jsDPI").innerHTML = dpi_x + " x " + dpi_y;

// handles FF default zoom levels 30%-300%
var varDPI = (function () {
for (var i = 27; i < 2000; i++) {
    if (matchMedia("(max-resolution: " + i + "dpi)").matches === true) {
        return i;}}return i;})();
//console.log("mediaMatch DPI: "+varDPI);

// method is a dirty hack: doesn't always work e.g. if a smartphone keyboard reduces the height
function getMathOrient(){
	if (window.innerHeight > window.innerWidth) { return "portrait";}
	else { return "landscape";};
};

function getmmOrient(){
	if (window.matchMedia("(orientation: portrait)").matches) { return "portrait";}
	else if (window.matchMedia("(orientation: landscape)").matches)	{ return "landscape";};
};

function getScrOrient(){
	var orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;
	if (orientation === "landscape-primary") { return "landscape";}
	else if (orientation === "landscape-secondary") { return "landscape upside down";}
	else if (orientation === "portrait-secondary" || orientation === "portrait-primary") { return "portrait";}
	else if (orientation === undefined) { return "undefined";};
};

document.getElementById("ScrRes").innerHTML = screen.width+" x "+screen.height+" ("+screen.left+","+screen.top+")";
document.getElementById("ScrAvail").innerHTML = screen.availWidth+" x "+screen.availHeight+" ("+screen.availLeft+","+screen.availTop+")";
document.getElementById("WndOut").innerHTML = window.outerWidth+" x "+window.outerHeight+" ("+window.screenX+","+window.screenY+")";
document.getElementById("WndIn").innerHTML = window.innerWidth+" x "+window.innerHeight+" ("+window.mozInnerScreenX+","+window.mozInnerScreenY+")";
document.getElementById("PixDepth").innerHTML = screen.pixelDepth;
document.getElementById("ColDepth").innerHTML = screen.colorDepth;
document.getElementById("IsFS").innerHTML = window.fullScreen;
document.getElementById("ScrOrient").innerHTML = getScrOrient();
document.getElementById("mmOrient").innerHTML = getmmOrient();
document.getElementById("mathOrient").innerHTML = getMathOrient();
document.getElementById("DevPR").innerHTML = window.devicePixelRatio;

function setPBMode(){
  function setVal(val) {document.getElementById("IsPBMode").innerHTML = val};
  try {
    var db = indexedDB.open("IsPBMode");
    db.onerror = function(){setVal("true");};
    db.onsuccess = function(){setVal("false");};
  }
  catch(err) { 
    setVal("unknown");
  }
}
setPBMode();

/* TABLE 2: User Agent */

document.getElementById("nUserAgent").innerHTML = navigator.userAgent;
document.getElementById("nAppName").innerHTML = navigator.appName;
document.getElementById("nCodeName").innerHTML = navigator.appCodeName;
document.getElementById("nAppVersion").innerHTML = navigator.appVersion;
document.getElementById("nPlatform").innerHTML = navigator.platform;
document.getElementById("nOscpu").innerHTML = navigator.oscpu;
document.getElementById("nOnLine").innerHTML = navigator.onLine;
document.getElementById("nBuildID").innerHTML = navigator.buildID;


/* TABLE 3:  Language / Locale / Time Zone / Date Format */
document.getElementById("nLanguage").innerHTML = navigator.language;

/* TABLE 8: High Precision Math */

// use algebraic expression: compare to https://fpcentral.tbb.torproject.org/fp#
function getMath1(x) {
      if (x === -Infinity) {
          return x;
      } else {
          return Math.log(x + Math.sqrt(x * x + 1));
      }
  }

function getMath2(x) {return Math.log(x + Math.sqrt(x * x - 1));}
function getMath3(x) {return Math.log((1 + x) / (1 - x)) / 2;}
function getMath4(x) {return Math.exp(x) - 1;}
function getMath5(x) {var y = Math.pow(Math.abs(x), 1 / 3); return x < 0 ? -y : y;}
function getMath6(x) {return Math.log(1 + x);}
function getMath7(x) {var y = Math.exp(x); return (y - 1 / y) / 2;}
function getMath8(x) {var y = Math.exp(x); return (y + 1 / y) / 2;}
function getMath9(x) {
      if (x === Infinity) {
          return 1;
      } else if (x === -Infinity) {
          return -1;
      } else {
          var y = Math.exp(2 * x);
          return (y - 1) / (y + 1);
      }
  }

document.getElementById("math1").innerHTML = getMath1(1);
document.getElementById("math2").innerHTML = getMath2(1e300);
document.getElementById("math3").innerHTML = getMath3(0.5)
document.getElementById("math4").innerHTML = getMath4(1);
document.getElementById("math5").innerHTML = getMath5(100);
document.getElementById("math6").innerHTML = getMath6(10);
document.getElementById("math7").innerHTML = getMath7(1);
document.getElementById("math8").innerHTML = getMath8(10);
document.getElementById("math9").innerHTML = getMath9(1);

