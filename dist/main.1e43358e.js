// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/logic/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIcon = exports.xIcon = exports.settingsForm = exports.settingsIcon = exports.settingsButton = exports.settingsPannel = exports.warningText = exports.warningWrapper = exports.textContainer = exports.textWrapper = exports.text = void 0;
// START - ELEMENTS - START
var formInputs = Array.from(document.querySelectorAll('.input'));
var text = document.getElementById('text');
exports.text = text;
var textWrapper = document.getElementById('textWrapper');
exports.textWrapper = textWrapper;
var textContainer = document.getElementById('textContainer');
exports.textContainer = textContainer;
var warningWrapper = document.getElementById('warningWrapper');
exports.warningWrapper = warningWrapper;
var warningText = document.getElementById('warningText');
exports.warningText = warningText;
var settingsPannel = document.getElementById('settingsPannel');
exports.settingsPannel = settingsPannel;
var settingsButton = document.getElementById('settingsButton');
exports.settingsButton = settingsButton;
var settingsIcon = document.getElementById('settingsIcon');
exports.settingsIcon = settingsIcon;
var settingsForm = document.getElementById('settingsForm');
exports.settingsForm = settingsForm;
var xIcon = document.getElementById('xIcon');
exports.xIcon = xIcon;
var checkIcon = document.getElementById('checkIcon'); // END - ELEMENTS - END
// START - UTILS - START

exports.checkIcon = checkIcon;

var getStyle = function getStyle(element, styleProp) {
  return element.style[styleProp] || getComputedStyle(element)[styleProp];
};

var getNumericalValue = function getNumericalValue(text) {
  var regex = /\d+/g;
  return parseInt(text.match(regex)[0]);
}; // END - UTILS - END


settingsButton.addEventListener('click', function () {
  var settingsDisplay = getStyle(settingsPannel, 'display');

  if (settingsDisplay === 'none') {
    settingsPannel.style.display = 'block';
    settingsIcon.style.opacity = 1;
  } else {
    settingsPannel.style.display = 'none';
    settingsIcon.style.opacity = 0.7;
  }
});
formInputs.forEach(function (input) {
  var name = input.name;
  var readValue;
  var onChange;

  switch (name) {
    case 'textColor':
      readValue = getStyle(text, 'color');

      onChange = function onChange(e) {
        var v = e.target.value;
        text.style.color = v;
        formInputs.forEach(function (i) {
          return i.style.color = v;
        });
        settingsPannel.style.color = v;
      };

      break;

    case 'backgroundColor':
      readValue = getStyle(document.body, 'background-color');

      onChange = function onChange(e) {
        var v = e.target.value;
        document.body.style.backgroundColor = v;
        document.documentElement.style.backgroundColor = v;
      };

      break;

    case 'fontSize':
      readValue = getNumericalValue(getStyle(text, 'font-size'));

      onChange = function onChange(e) {
        var v = Math.round(e.target.value);
        var height = getNumericalValue(getStyle(textWrapper, 'height'));
        var lineHeight = getNumericalValue(getStyle(text, 'line-height'));
        var lineCount = height / lineHeight;
        var nextLineHeight = Math.round(v + 8);
        var nextHeight = Math.round(nextLineHeight * lineCount);
        input.value = v;
        text.style.fontSize = "".concat(v, "px");
        text.style.lineHeight = "".concat(nextLineHeight, "px");
        textWrapper.style.height = "".concat(nextHeight, "px");
      };

      break;

    case 'lineCount':
      {
        var height = getNumericalValue(getStyle(textWrapper, 'height'));
        var lineHeight = getNumericalValue(getStyle(text, 'line-height'));
        readValue = height / lineHeight;

        onChange = function onChange(e) {
          var v = Math.round(e.target.value);
          var fontSize = getNumericalValue(getStyle(text, 'font-size'));
          var lineHeight = Math.round(fontSize + 8);
          var height = Math.round(lineHeight * v);
          textWrapper.style.height = "".concat(height, "px");
          text.style.lineHeight = "".concat(lineHeight, "px");
          input.value = v;
        };

        break;
      }

    default:
      return;
  }

  input.value = readValue;
  input.addEventListener('change', onChange);
});
},{}],"src/logic/speech.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recognition = void 0;

var _elements = require("./elements");

var _elements2 = require("/src/logic/elements");

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;
var recognition;
exports.recognition = recognition;
var autorestart = true;

var setErrorState = function setErrorState(allowRestart) {
  autorestart = !!allowRestart;
  _elements2.xIcon.style.display = 'block';
  _elements2.checkIcon.style.display = 'none';
  _elements2.textContainer.style.display = 'none';
  _elements2.settingsButton.style.display = 'none';
  _elements2.warningWrapper.style.display = 'block';
  _elements2.settingsPannel.style.display = 'none';
};

if (typeof SpeechRecognition === 'undefined') {
  exports.recognition = recognition = {
    start: function start() {}
  };
  setErrorState();
  _elements.warningText.textContent = 'This browser does not support the Speech Recognition API. Please switch to Google Chrome and try again.';
} else {
  exports.recognition = recognition = new SpeechRecognition();
} // Recognition config


recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = function (e) {
  var resultArray = Array.from(e.results);
  var string = resultArray.map(function (r) {
    return r[0].transcript;
  }).join('');
  _elements2.text.textContent = string;

  _elements2.textWrapper.scroll(0, _elements2.textWrapper.scrollHeight);
};

recognition.onend = function () {
  // Speech Recognition ends every few seconds of inactivity
  // but we want to keep it alive while the user is on the page
  if (autorestart) {
    recognition.start();
  }
};

recognition.onerror = function (e) {
  switch (e.error) {
    case 'no-speech':
      break;

    case 'not-allowed':
    case 'service-not-allowed':
      setErrorState();
      _elements.warningText.textContent = 'Stream CC needs permission to access your microphone. Please enable microphone access and reload this page.';
      break;

    case 'network':
      // @TODO Networking error should lead to a reconnect once network connection is detected
      setErrorState();
      _elements.warningText.textContent = 'Stream CC cannot connect to the internet. Please check your connection and reload the page.';
      break;

    default:
      console.warn("".concat(e.error, ". You can report this error with reproduction steps to https://github.com/tchryssos/stream-cc/issues"));
  }
};
},{"./elements":"src/logic/elements.js","/src/logic/elements":"src/logic/elements.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _speech = require("/src/logic/speech");

_speech.recognition.start();
},{"/src/logic/speech":"src/logic/speech.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50860" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map