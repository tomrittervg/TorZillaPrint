'use strict';
class DOM {
  constructor() {
    // just a pinch of awesome
    this.raw = document.getElementsByTagName('*');
    for(const e of this.raw) {
      if (e.id) this[e.id] = new Proxy(e, {
        get: function(obj, prop) {
          if (prop === 'val') return obj.textContent;
        },
        set: function(obj, prop, val) {
          if (prop === 'val') {
            obj.textContent = val;
            return true;
          }
        }
      });
    }
  }
}
