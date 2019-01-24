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
};

function base64Encode(str, encoding = 'utf-8') {
    var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);
    return base64js.fromByteArray(bytes);
};

function base64Decode(str, encoding = 'utf-8') {
    var bytes = base64js.toByteArray(str);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
};

function byteArrayToHex(arrayBuffer){
  var chunks = [];
  (new Uint32Array(arrayBuffer)).forEach(function(num){
    chunks.push(num.toString(16));
  });
  return chunks.map(function(chunk){
    return "0".repeat(8 - chunk.length) + chunk;
  }).join("");
};
