/* TABLE: Miscellaneous */

'use strict';

/* clipboard */
if ("clipboard" in navigator) {dom.nClipboard="enabled"} else {dom.nClipboard="disabled"};

/* Intersection Observer api (dom.IntersectionObserver.enabled) */
var callback = function(entries, observer) {};
try {
  var observer = new IntersectionObserver(callback);
  dom.intObserver="enabled"
} catch(e) {dom.intObserver="disabled" };

/* requestIdleCallback (dom.requestIdleCallback.enabled) */
if ("requestIdleCallback" in window) {dom.reqIdleCB="enabled"} else {dom.reqIdleCB="disabled"};
