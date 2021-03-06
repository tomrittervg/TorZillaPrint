/* TABLE: DOMRect */

/* code based on work by kkapsner and canvasblocker
   https://canvasblocker.kkapsner.de/test/
   https://github.com/kkapsner/CanvasBlocker */

"use strict";

(function(){
  const iframeDR = document.getElementById("iframeDR");
  function getElements(){
    const docDR = iframeDR.contentDocument;
    return Array.from(docDR.querySelectorAll("*[id^=rect]"));
  }
  function createTest(method, callback){
  const properties = ["x", "y", "width", "height", "top", "left", "right", "bottom"];
    function performTest(){
      const rects = getElements().map(callback);
      const data = new Float64Array(rects.length * properties.length);
        rects.forEach(function(rect, i){
          properties.forEach(function(property, j){
            data[i * properties.length + j] = rect[property];
          });
        });
        // output hash
        crypto.subtle.digest("SHA-256", data).then(function(hash){
          document.getElementById(method).textContent = byteArrayToHex(hash);
        });
        // output results
        var item=0;
        properties.map(function(property){
          return rects.map(function(rect, i){
            item=item+1;
            document.getElementById(method+item).textContent = rect[property];
            return rect[property];
          }).join("")
        }).join("")
    }
    performTest();
  }
  // set the iframe source here
  iframeDR.src = "iframes/domrect.html";
  // listen for it
  iframeDR.addEventListener("load", function(){
    createTest("dr1", function(element){return element.getClientRects()[0];});
    createTest("dr2", function(element){return element.getBoundingClientRect();});
    createTest("dr3", function(element){
      var range = document.createRange();
      range.selectNode(element);
      return range.getClientRects()[0];
    });
    createTest("dr4", function(element){
      var range = document.createRange();
      range.selectNode(element);
      return range.getBoundingClientRect();
    });
  });
}());
