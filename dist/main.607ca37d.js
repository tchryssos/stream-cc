parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"LBmu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.recognition=void 0;var e,o=window.SpeechRecognition||window.webkitSpeechRecognition;exports.recognition=e,exports.recognition=e=void 0===o?{error:"This browser does not support speech recognition. Please open this app in Google Chrome."}:new o,e.continuous=!0,e.interimResults=!0;
},{}],"Pzto":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.textWrapper=exports.text=void 0;var e=document.getElementById("text");exports.text=e;var t=document.getElementById("textWrapper");exports.textWrapper=t;
},{}],"HJDO":[function(require,module,exports) {
"use strict";var r=require("/src/logic/speech"),t=require("/src/logic/elements");r.recognition.error?(console.warn(r.recognition.error),t.text.textContent=r.recognition.error):(r.recognition.start(),r.recognition.onresult=function(r){var e=Array.from(r.results).map(function(r){return r[0].transcript}).join("");t.text.textContent=e,t.textWrapper.scroll(0,t.textWrapper.scrollHeight)});
},{"/src/logic/speech":"LBmu","/src/logic/elements":"Pzto"}]},{},["HJDO"], null)
//# sourceMappingURL=main.607ca37d.js.map