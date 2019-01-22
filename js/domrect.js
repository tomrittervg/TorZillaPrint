/* TABLE: DOMRect */

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
	}

	const iframeDR = document.getElementById("iframeDR");

	function getElements(){
		const docDR = iframeDR.contentDocument;
		return Array.from(docDR.querySelectorAll("*[id^=rect]"));
	}

	function createTest(title, callback){
        //console.log("starting test "+title);
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
			crypto.subtle.digest("SHA-256", data)
				.then(function(hash){
					document.getElementById(title).textContent = byteArrayToHex(hash);
				});

            /* original table output
			output.querySelector(".data").innerHTML = "<table><tr><th></th>" +
				rects.map(function(rect, i){
					return "<th>rect " + (i + 1) + "</th>";
				}).join("") +
				"</tr>" +
				properties.map(function(property){
					return "<tr><th>" + property + "</th>" + rects.map(function(rect, i){
						return "<td>" + rect[property] + "</td>";
					}).join("") + "</tr>";
				}).join("") +
				"</table>";
            */
		}
		performTest();
	}

	iframeDR.addEventListener("load", function(){
      createTest("dr1", function(element){
        return element.getClientRects()[0];
      });
      createTest("dr2", function(element){
        return element.getBoundingClientRect();
      });
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
