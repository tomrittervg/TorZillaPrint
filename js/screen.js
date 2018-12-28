
/* TABLE: Screen Information */

// Test DPI
var devicePixelRatio = window.devicePixelRatio || 1;
var dpi_x = Math.round(document.getElementById('testdpi').offsetWidth * devicePixelRatio);
var dpi_y = Math.round(document.getElementById('testdpi').offsetHeight * devicePixelRatio);
document.getElementById("jsDPI").innerHTML = dpi_x + " x " + dpi_y;

// handles FF default zoom levels 30%-300%
var varDPI = (function () {
for (var i = 27; i < 2000; i++) {
    if (matchMedia("(max-resolution: " + i + "dpi)").matches === true) {
        return i;}}return i;})();
document.getElementById("mmDPI").innerHTML = varDPI;

// zoom: calculate from js dpi vs mediaMatch dpi
var Zoom = Math.round((varDPI/dpi_x)*100)
document.getElementById("jsZoom").innerHTML = Zoom+"%";

// this method is a dirty hack: doesn't always work e.g. if a smartphone keyboard reduces the height
function getMathOrient(){
	if (window.innerHeight === window.innerWidth) { return "no idea, you're square!";}
	else if (window.innerHeight < window.innerWidth) { return "landscape";}
	else { return "portrait";};
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

// Viewport
document.getElementById("Viewport").innerHTML = window.innerWidth + " x " + window.innerWidth