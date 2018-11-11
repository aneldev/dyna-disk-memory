(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-disk-memory", ["fs", "path"], factory);
	else if(typeof exports === 'object')
		exports["dyna-disk-memory"] = factory(require("fs"), require("path"));
	else
		root["dyna-disk-memory"] = factory(root["fs"], root["path"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE_fs__, __WEBPACK_EXTERNAL_MODULE_path__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/node.ts");
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

var DynaDiskMemoryForBrowser =
/** @class */
function () {
  function DynaDiskMemoryForBrowser(settings) {
    this._test_performDiskDelay = 0;
    this._settings = __assign({
      fragmentSize: 13
    }, settings);
    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';
  }

  DynaDiskMemoryForBrowser.prototype.set = function (container, key, data) {
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

  DynaDiskMemoryForBrowser.prototype.get = function (container, key) {
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

  DynaDiskMemoryForBrowser.prototype.del = function (container, key) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var names = _this._generateFilename(container, key);

      localStorage.removeItem(names.full);
      setTimeout(resolve, _this._test_performDiskDelay);
    });
  };

  DynaDiskMemoryForBrowser.prototype.delContainer = function (container) {
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

  DynaDiskMemoryForBrowser.prototype.delAll = function () {
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

  DynaDiskMemoryForBrowser.prototype._generateFilename = function (container, key) {
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

  return DynaDiskMemoryForBrowser;
}();

exports.DynaDiskMemoryForBrowser = DynaDiskMemoryForBrowser;

/***/ }),

/***/ "./src/DynaDiskMemoryForNode.ts":
/*!**************************************!*\
  !*** ./src/DynaDiskMemoryForNode.ts ***!
  \**************************************/
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

var fs = __webpack_require__(/*! fs */ "fs");

var path = __webpack_require__(/*! path */ "path");

var exec = __webpack_require__(/*! child_process */ "child_process").exec;

var dyna_job_queue_1 = __webpack_require__(/*! dyna-job-queue */ "dyna-job-queue");

var dyna_node_fs_1 = __webpack_require__(/*! dyna-node-fs */ "dyna-node-fs");

var md5 = __webpack_require__(/*! md5 */ "md5");

var DynaDiskMemoryForNode =
/** @class */
function () {
  function DynaDiskMemoryForNode(settings) {
    this._jogQueue = new dyna_job_queue_1.DynaJobQueue();
    this._test_performDiskDelay = 0;
    this._settings = __assign({
      fragmentSize: 13
    }, settings);
    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';
    if (this._test_performDiskDelay) console.warn('DynaDiskMemory is working with _test_performDiskDelay not zero, this means will perform intentional delays, this should be not set like this on production');
  }

  DynaDiskMemoryForNode.prototype.set = function (container, key, data) {
    var _this = this;

    return this._jogQueue.addJobPromise(function (resolve, reject) {
      _this._saveFile(container, key, data).then(function () {
        return resolve();
      }).catch(reject);
    });
  };

  DynaDiskMemoryForNode.prototype.get = function (container, key) {
    var _this = this;

    return this._jogQueue.addJobPromise(function (resolve, reject) {
      _this._loadFile(container, key).then(resolve).catch(reject);
    });
  };

  DynaDiskMemoryForNode.prototype.del = function (container, key) {
    var _this = this;

    return this._jogQueue.addJobPromise(function (resolve, reject) {
      var fileInfo = _this._generateFilename(container, key);

      dyna_node_fs_1.deleteFile(fileInfo.full).then(function () {
        return _this._deleteEmptyFolderPath(fileInfo);
      }).then(function () {
        return resolve();
      }).catch(reject);
    });
  };

  DynaDiskMemoryForNode.prototype._deleteEmptyFolderPath = function (fileInfo) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var foldersToDel = [];
      var folder = fileInfo.folder;

      while (folder.length && folder !== _this._settings.diskPath.slice(0, -1)) {
        foldersToDel.push(folder);
        folder = folder.substr(0, folder.lastIndexOf('/'));
      }

      var folderToDel = foldersToDel.shift();

      var run = function () {
        if (folderToDel) {
          _this._deleteEmptyFolder(folderToDel).then(function () {
            folderToDel = foldersToDel.shift();
            if (folderToDel) run();else resolve();
          }).catch(reject);
        } else {
          resolve(); // no folder
        }
      };

      run(); // start
    });
  };

  DynaDiskMemoryForNode.prototype._deleteEmptyFolder = function (folder) {
    return dyna_node_fs_1.isFolderEmpty(folder).then(function (isEmpty) {
      if (!isEmpty) return;
      return dyna_node_fs_1.rmdir(folder);
    });
  };

  DynaDiskMemoryForNode.prototype.delContainer = function (container) {
    var _this = this;

    return this._jogQueue.addJobPromise(function (resolve, reject) {
      var folder = _this._generateFilename(container).folder;

      dyna_node_fs_1.rmdir(folder).then(function () {
        return resolve();
      }).catch(reject);
    });
  };

  DynaDiskMemoryForNode.prototype.delAll = function () {
    var _this = this;

    return this._jogQueue.addJobPromise(function (resolve, reject) {
      dyna_node_fs_1.rmdir(_this._settings.diskPath).then(function () {
        return resolve();
      }).catch(reject);
    });
  };

  DynaDiskMemoryForNode.prototype._saveFile = function (container, key, data) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var fileNames = _this._generateFilename(container, key);

      _this._createDirectory(fileNames.folder).then(function () {
        _this._writeFileOnDisk(fileNames.folder, fileNames.file, data).then(function () {
          return resolve();
        }).catch(reject);
      }).catch(reject);
    });
  };

  DynaDiskMemoryForNode.prototype._loadFile = function (container, key) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var fileNames = _this._generateFilename(container, key);

      _this._readFileFromDisk(fileNames.folder, fileNames.file).then(function (data) {
        return resolve(data);
      }).catch(function (error) {
        return resolve(undefined);
      });
    });
  };

  DynaDiskMemoryForNode.prototype._createDirectory = function (directory) {
    // todo: make this async
    return new Promise(function (resolve, reject) {
      try {
        var sep = '/'; //path.sep;

        var initDir = path.isAbsolute(directory) ? sep : '';
        directory.split(sep).reduce(function (parentDir, childDir) {
          var curDir = path.resolve(parentDir, childDir);
          if (!fs.existsSync(curDir)) fs.mkdirSync(curDir);
          return curDir;
        }, initDir);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  DynaDiskMemoryForNode.prototype._writeFileOnDisk = function (folder, fileName, data) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var fullPath = folder + "/" + fileName;
      setTimeout(function () {
        fs.exists(fullPath, function (exists) {
          if (exists) fs.unlinkSync(fullPath);
          fs.writeFile("" + fullPath, JSON.stringify(data), function (err) {
            if (err) reject({
              errorMessage: "Cannot write file [" + fullPath + "]",
              error: err
            });else resolve();
          });
        });
      }, _this._test_performDiskDelay);
    });
  };

  DynaDiskMemoryForNode.prototype._readFileFromDisk = function (folder, fileName) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var fullFileName = folder + "/" + fileName;
        fs.exists(fullFileName, function (exists) {
          if (exists) {
            fs.readFile(fullFileName, 'utf8', function (err, data) {
              if (err) reject({
                code: 1802241812,
                errorMessage: "Cannot read file [" + fullFileName + "]",
                error: err
              });else try {
                resolve(JSON.parse(data));
              } catch (error) {
                reject({
                  code: 1802241811,
                  errorMessage: "Cannot parse file [" + fullFileName + "]",
                  error: err
                });
              }
            });
          } else {
            reject({
              code: 1802241813,
              errorMessage: "DynaDiskMemory: _readFileFromDisk: cannot find to read file for folder [" + folder + "] and fileName [" + fileName + "]",
              fullFileName: fullFileName
            });
          }
        });
      }, _this._test_performDiskDelay);
    });
  };

  DynaDiskMemoryForNode.prototype._generateFilename = function (container, key) {
    if (key === void 0) {
      key = '';
    }

    var generatedContainer = this._getAsciiCodeHash(container);

    var generatedKey = this._splitText(this._getAsciiCodeHash(key), this._settings.fragmentSize, '/');

    var full = "" + this._settings.diskPath + generatedContainer + "/" + generatedKey;
    var folder = full.substr(0, full.lastIndexOf('/'));
    var file = full.substr(full.lastIndexOf('/') + 1);
    var containerBase = generatedContainer + "/" + generatedKey;
    containerBase = containerBase.substr(0, containerBase.lastIndexOf('/'));
    return {
      full: full,
      folder: folder,
      file: file,
      containerBase: containerBase
    };
  };

  DynaDiskMemoryForNode.prototype._getAsciiCodeHash = function (key) {
    return md5(key);
  };

  DynaDiskMemoryForNode.prototype._splitText = function (text, step, separetor) {
    var output = "";
    var se = text.split('').reverse();

    while (se.length) output += se.splice(0, step).join('') + separetor;

    if (output[output.length - 1] == separetor) output += '_fc';
    return output;
  };

  return DynaDiskMemoryForNode;
}();

exports.DynaDiskMemoryForNode = DynaDiskMemoryForNode;

/***/ }),

/***/ "./src/DynaDiskMemoryUniversal.ts":
/*!****************************************!*\
  !*** ./src/DynaDiskMemoryUniversal.ts ***!
  \****************************************/
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

var dyna_universal_1 = __webpack_require__(/*! dyna-universal */ "dyna-universal");

var DynaDiskMemoryForBrowser_1 = __webpack_require__(/*! ./DynaDiskMemoryForBrowser */ "./src/DynaDiskMemoryForBrowser.ts");

var DynaDiskMemoryForNode_1 = __webpack_require__(/*! ./DynaDiskMemoryForNode */ "./src/DynaDiskMemoryForNode.ts");

var DynaDiskMemoryUniversal =
/** @class */
function () {
  function DynaDiskMemoryUniversal(settings) {
    this._test_performDiskDelay = 0;
    this._settings = __assign({
      fragmentSize: 13,
      _test_workForBrowser: false,
      _test_performDiskDelay: 0
    }, settings);
    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';
    if (this._settings._test_workForBrowser) this._memory = new DynaDiskMemoryForBrowser_1.DynaDiskMemoryForBrowser(this._settings);else if (dyna_universal_1.isNode) this._memory = new DynaDiskMemoryForNode_1.DynaDiskMemoryForNode(this._settings);else this._memory = new DynaDiskMemoryForBrowser_1.DynaDiskMemoryForBrowser(this._settings);
    this._memory._test_performDiskDelay = this._test_performDiskDelay;
  }

  DynaDiskMemoryUniversal.prototype.set = function (container, key, data) {
    return this._memory.set(container, key, data);
  };

  DynaDiskMemoryUniversal.prototype.get = function (container, key) {
    return this._memory.get(container, key);
  };

  DynaDiskMemoryUniversal.prototype.del = function (container, key) {
    return this._memory.del(container, key);
  };

  DynaDiskMemoryUniversal.prototype.delContainer = function (container) {
    return this._memory.delContainer(container);
  };

  DynaDiskMemoryUniversal.prototype.delAll = function () {
    return this._memory.delAll();
  };

  return DynaDiskMemoryUniversal;
}();

exports.DynaDiskMemoryUniversal = DynaDiskMemoryUniversal;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DynaDiskMemoryUniversal_1 = __webpack_require__(/*! ./DynaDiskMemoryUniversal */ "./src/DynaDiskMemoryUniversal.ts");

exports.DynaDiskMemory = DynaDiskMemoryUniversal_1.DynaDiskMemoryUniversal;

/***/ }),

/***/ "./src/node.ts":
/*!*********************!*\
  !*** ./src/node.ts ***!
  \*********************/
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

__export(__webpack_require__(/*! ./ */ "./src/index.ts"));

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "dyna-job-queue":
/*!*********************************!*\
  !*** external "dyna-job-queue" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("dyna-job-queue");

/***/ }),

/***/ "dyna-node-fs":
/*!*******************************!*\
  !*** external "dyna-node-fs" ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("dyna-node-fs");

/***/ }),

/***/ "dyna-universal":
/*!*********************************!*\
  !*** external "dyna-universal" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("dyna-universal");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_fs__;

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_path__;

/***/ })

/******/ });
});
//# sourceMappingURL=node.js.map