/* TABLE: Screen */

'use strict';

// Test DPI
const devicePixelRatio = window.devicePixelRatio || 1;
const dpi_x = Math.round(dom.testdpi.offsetWidth * devicePixelRatio);
const dpi_y = Math.round(dom.testdpi.offsetHeight * devicePixelRatio);
dom.jsDPI = dpi_x;

// handles FF default zoom levels 30%-300%
const varDPI = (function () {
for (var i = 27; i < 2000; i++) {
    if (matchMedia("(max-resolution: " + i + "dpi)").matches === true) {
        return i;}}return i;})();
dom.mmDPI = varDPI;

// zoom: calculate from js dpi vs mediaMatch dpi
dom.jsZoom = Math.round((varDPI/dpi_x)*100).toString();

dom.ScrRes = screen.width+" x "+screen.height+" ("+screen.left+","+screen.top+")";
dom.ScrAvail = screen.availWidth+" x "+screen.availHeight+" ("+screen.availLeft+","+screen.availTop+")";
dom.WndOut = window.outerWidth+" x "+window.outerHeight+" ("+window.screenX+","+window.screenY+")";
dom.WndIn = window.innerWidth+" x "+window.innerHeight+" ("+window.mozInnerScreenX+","+window.mozInnerScreenY+")";
dom.PixDepth = screen.pixelDepth;
dom.ColDepth = screen.colorDepth;
dom.IsFS = window.fullScreen;
dom.ScrOrient = (function () {
	var orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;
	if (orientation === "landscape-primary") return "landscape";
	if (orientation === "landscape-secondary") return "landscape upside down";
	if (orientation === "portrait-secondary" || orientation === "portrait-primary") return "portrait";
	if (orientation === undefined) return "undefined";
})();
dom.mmOrient = (function () {
	if (window.matchMedia("(orientation: portrait)").matches) return "portrait";
	if (window.matchMedia("(orientation: landscape)").matches) return "landscape";
})();
dom.mathOrient = (function () {
// this method is a dirty hack: doesn't always work e.g. if a smartphone keyboard reduces the height
	if (window.innerHeight === window.innerWidth) return "no idea, you're square!";
	if (window.innerHeight < window.innerWidth) return "landscape";
	return "portrait";
})();
dom.DevPR = window.devicePixelRatio;

// PB Mode
try {
  var db = indexedDB.open("IsPBMode");
  db.onerror = function() {dom.IsPBMode = "true";};
  db.onsuccess = function() {dom.IsPBMode = "false";};
}
catch(err) {
  dom.IsPBMode = "unknown";
}

dom.Viewport = (function () {
  var e=document.createElement( "div" );
  e.style.cssText="position:fixed;top:0;left:0;bottom:0;right:0;";
  document.documentElement.insertBefore(e,document.documentElement.firstChild);
  var vw=e.offsetWidth;
  var vh=e.offsetHeight;
  document.documentElement.removeChild(e);
  return vw + " x " + vh
})();
