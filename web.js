(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dyna-disk-memory", [], factory);
	else if(typeof exports === 'object')
		exports["dyna-disk-memory"] = factory();
	else
		root["dyna-disk-memory"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/web.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DynaDiskMemoryForBrowser.ts":
/*!*****************************************!*\
  !*** ./src/DynaDiskMemoryForBrowser.ts ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }

  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DynaDiskMemory =
/** @class */
function () {
  function DynaDiskMemory(settings) {
    this._test_performDiskDelay = 0;
    this._settings = __assign({
      fragmentSize: 13
    }, settings);
    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';
  }

  DynaDiskMemory.prototype.set = function (container, key, data) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      try {
        var names = _this._generateFilename(container, key);

        localStorage.setItem(names.full, JSON.stringify(data));
        setTimeout(resolve, _this._test_performDiskDelay);
      } catch (err) {
        setTimeout(reject, _this._test_performDiskDelay, err);
      }
    });
  };

  DynaDiskMemory.prototype.get = function (container, key) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      try {
        var names = _this._generateFilename(container, key);

        var rawData = localStorage.getItem(names.full);
        var data = undefined;
        if (typeof rawData == 'string') data = JSON.parse(rawData);
        setTimeout(resolve, _this._test_performDiskDelay, data);
      } catch (err) {
        setTimeout(reject, _this._test_performDiskDelay, err);
      }
    });
  };

  DynaDiskMemory.prototype.del = function (container, key) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var names = _this._generateFilename(container, key);

      localStorage.removeItem(names.full);
      setTimeout(resolve, _this._test_performDiskDelay);
    });
  };

  DynaDiskMemory.prototype.delContainer = function (container) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var names = _this._generateFilename(container);

      Object.keys(localStorage).filter(function (key) {
        return key.startsWith(names.folder + '/');
      }).forEach(function (key) {
        return localStorage.removeItem(key);
      });
      setTimeout(resolve, _this._test_performDiskDelay);
    });
  };

  DynaDiskMemory.prototype.delAll = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var names = _this._generateFilename();

      Object.keys(localStorage).filter(function (key) {
        return key.startsWith(names.base + '/');
      }).forEach(function (key) {
        return localStorage.removeItem(key);
      });
      setTimeout(resolve, _this._test_performDiskDelay);
    });
  };

  DynaDiskMemory.prototype._generateFilename = function (container, key) {
    if (container === void 0) {
      container = '---';
    }

    if (key === void 0) {
      key = '---';
    }

    var full = "dyna-disk-memory/" + this._settings.diskPath + container + "/" + key;
    var base = full.substr(0, full.indexOf('/'));
    var folder = full.substr(0, full.lastIndexOf('/'));
    var file = full.substr(full.lastIndexOf('/') + 1);
    return {
      full: full,
      base: base,
      folder: folder,
      file: file
    };
  };

  return DynaDiskMemory;
}();

exports.DynaDiskMemory = DynaDiskMemory;

/***/ }),

/***/ "./src/web.ts":
/*!********************!*\
  !*** ./src/web.ts ***!
  \********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(/*! ./DynaDiskMemoryForBrowser */ "./src/DynaDiskMemoryForBrowser.ts"));

/***/ })

/******/ });
});
//# sourceMappingURL=web.js.map