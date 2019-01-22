/* TABLE: DOMRect */

/* code based on kkapsner and canvasblocker
   https://canvasblocker.kkapsner.de/test/domRectTest.html
   https://github.com/kkapsner/CanvasBlocker */

(function(){
  "use strict";
  function byteArrayToHex(arrayBuffer){
    var chunks = [];
    (new Uint32Array(arrayBuffer)).forEach(function(num){
      chunks.push(num.toString(16));
    });
    return chunks.map(function(chunk){
      return "0".repeat(8 - chunk.length) + chunk;
    }).join("");
  };

  const iframeDR = document.getElementById("iframeDR");
  const docDR = iframeDR.contentDocument;
  var drStart = "";

  function getElements(){
    return Array.from(docDR.querySelectorAll("*[id^=rect]"));
  };

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
  };

  function runtest(){
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
    console.log("domrect tests triggered by "+drStart);
  };

  // eventlistener
  iframeDR.addEventListener("load", function(){
    if (drStart == ""){
      drStart = "eventlistener: load";
      runtest();
    };
  });
  // backup trigger
  setTimeout(function(){
    if(drStart == ""){
      if (docDR.readyState == "complete"){
          drStart = "backup timer";
          runtest();     
      };
    }
  }, 2000);
 
}());
