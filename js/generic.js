'use strict';

function getUniqueElements() {
  // live interface for snazzy access to DOM elements with an ID
  // more efficient and clean than calling getElementById a gazillion times
  const dom = document.getElementsByTagName('*');
  return new Proxy(dom, {
    get: function(obj, prop) {
      return obj[prop];
    },
    set: function(obj, prop, val) {
        obj[prop].textContent = `${val}`;
        return true;
    }
  });
}
