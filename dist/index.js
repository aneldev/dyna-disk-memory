(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("child_process"), require("fs"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-disk-memory", ["child_process", "fs", "path"], factory);
	else if(typeof exports === 'object')
		exports["dyna-disk-memory"] = factory(require("child_process"), require("fs"), require("path"));
	else
		root["dyna-disk-memory"] = factory(root["child_process"], root["fs"], root["path"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DynaDiskMemoryUniversal_1 = __webpack_require__(3);
exports.DynaDiskMemory = DynaDiskMemoryUniversal_1.DynaDiskMemoryUniversal;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DynaDiskMemoryForBrowser {
    constructor(settings) {
        this._test_performDiskDelay = 0;
        this._settings = Object.assign({ fragmentSize: 13 }, settings);
        if (settings.diskPath[settings.diskPath.length - 1] !== '/')
            this._settings.diskPath += '/';
    }
    set(container, key, data) {
        return new Promise((resolve, reject) => {
            const names = this._generateFilename(container, key);
            localStorage.setItem(names.full, JSON.stringify(data));
            setTimeout(resolve, this._test_performDiskDelay);
        });
    }
    get(container, key) {
        return new Promise((resolve, reject) => {
            const names = this._generateFilename(container, key);
            const data = JSON.parse(localStorage.getItem(names.full));
            setTimeout(resolve, this._test_performDiskDelay, data);
        });
    }
    del(container, key) {
        return new Promise((resolve, reject) => {
            const names = this._generateFilename(container, key);
            localStorage.removeItem(names.full);
            setTimeout(resolve, this._test_performDiskDelay);
        });
    }
    delContainer(container) {
        return new Promise((resolve, reject) => {
            const names = this._generateFilename(container);
            Object.keys(localStorage)
                .filter((key) => key.startsWith(names.folder + '/'))
                .forEach((key) => localStorage.removeItem(key));
            setTimeout(resolve, this._test_performDiskDelay);
        });
    }
    delAll() {
        return new Promise((resolve, reject) => {
            const names = this._generateFilename();
            Object.keys(localStorage)
                .filter((key) => key.startsWith(names.base + '/'))
                .forEach((key) => localStorage.removeItem(key));
            setTimeout(resolve, this._test_performDiskDelay);
        });
    }
    _generateFilename(container = '---', key = '---') {
        const full = `dyna-disk-memory/${this._settings.diskPath}${container}/${key}`;
        const base = full.substr(0, full.indexOf('/'));
        const folder = full.substr(0, full.lastIndexOf('/'));
        const file = full.substr(full.lastIndexOf('/') + 1);
        return { full, base, folder, file };
    }
    _isNode() {
        return typeof process === 'object' && typeof process.versions === 'object';
    }
}
exports.DynaDiskMemoryForBrowser = DynaDiskMemoryForBrowser;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(5);
const path = __webpack_require__(6);
const exec = __webpack_require__(4).exec;
class DynaDiskMemoryForNode {
    constructor(settings) {
        this._test_performDiskDelay = 0;
        this._settings = Object.assign({ fragmentSize: 13 }, settings);
        if (settings.diskPath[settings.diskPath.length - 1] !== '/')
            this._settings.diskPath += '/';
    }
    set(container, key, data) {
        return this._saveFile(container, key, data);
    }
    get(container, key) {
        return this._loadFile(container, key);
    }
    del(container, key) {
        return new Promise((resolve, reject) => {
            const fileName = this._generateFilename(container, key).full;
            fs.exists(fileName, function (exists) {
                if (exists) {
                    fs.unlink(fileName, function (err) {
                        err && reject(err) || resolve();
                    });
                }
                else {
                    reject({ errorMessage: `DynaDiskMemory: del: cannot find to del file for container [${container}] and key [${key}]`, fileName });
                }
            });
        });
    }
    delContainer(container) {
        return new Promise((resolve, reject) => {
            this._rmdir(`${this._settings.diskPath}${container}`, (error) => {
                error && reject(error) || resolve();
            });
        });
    }
    delAll() {
        return new Promise((resolve, reject) => {
            this._rmdir(this._settings.diskPath, (error) => {
                error && reject(error) || resolve();
            });
        });
    }
    _saveFile(container, key, data) {
        return new Promise((resolve, reject) => {
            let fileNames = this._generateFilename(container, key);
            this._createDirectory(fileNames.folder)
                .then(() => {
                this._writeFileOnDisk(fileNames.folder, fileNames.file, data)
                    .then(() => resolve())
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    _loadFile(container, key) {
        return new Promise((resolve, reject) => {
            let fileNames = this._generateFilename(container, key);
            this._readFileFromDisk(fileNames.folder, fileNames.file)
                .then((data) => resolve(data))
                .catch((error) => resolve(undefined));
        });
    }
    _createDirectory(directory) {
        // todo: make this async
        return new Promise((resolve, reject) => {
            try {
                const sep = '/'; //path.sep;
                const initDir = path.isAbsolute(directory) ? sep : '';
                directory.split(sep).reduce((parentDir, childDir) => {
                    const curDir = path.resolve(parentDir, childDir);
                    if (!fs.existsSync(curDir))
                        fs.mkdirSync(curDir);
                    return curDir;
                }, initDir);
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    _writeFileOnDisk(folder, fileName, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fs.writeFile(`${folder}/${fileName}`, JSON.stringify(data), (err) => {
                    if (err)
                        reject({ errorMessage: `Cannot write file [${folder}/${fileName}]`, error: err });
                    else
                        resolve();
                });
            }, this._test_performDiskDelay);
        });
    }
    _readFileFromDisk(folder, fileName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const fullFileName = `${folder}/${fileName}`;
                fs.exists(fullFileName, function (exists) {
                    if (exists) {
                        fs.readFile(fullFileName, 'utf8', (err, data) => {
                            if (err)
                                reject({ errorMessage: `Cannot read file [${fullFileName}]`, error: err });
                            else
                                resolve(JSON.parse(data));
                        });
                    }
                    else {
                        reject({ errorMessage: `DynaDiskMemory: _readFileFromDisk: cannot find to read file for folder [${folder}] and fileName [${fileName}]`, fullFileName });
                    }
                });
            }, this._test_performDiskDelay);
        });
    }
    _generateFilename(container, key) {
        const generatedContainer = this._getAsciiCodeHash(container);
        const generatedKey = this._splitText(this._getAsciiCodeHash(key), this._settings.fragmentSize, '/');
        const full = `${this._settings.diskPath}${generatedContainer}/${generatedKey}`;
        const folder = full.substr(0, full.lastIndexOf('/'));
        const file = full.substr(full.lastIndexOf('/') + 1);
        return { full, folder, file };
    }
    _getAsciiCodeHash(key) {
        return key
            .split('')
            .map((c) => c.charCodeAt(0))
            .join('_');
    }
    _splitText(text, step, separetor) {
        let output = "";
        let se = text.split('').reverse();
        while (se.length)
            output += se.splice(0, step).join('') + separetor;
        if (output[output.length - 1] == separetor)
            output += '_fc';
        return output;
    }
    _rmdir(file, cb) {
        exec('rm -rf ' + file, function (err, stdout, stderr) {
            cb(err);
        });
    }
    _isNode() {
        return typeof process === 'object' && typeof process.versions === 'object';
    }
}
exports.DynaDiskMemoryForNode = DynaDiskMemoryForNode;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DynaDiskMemoryForNode_1 = __webpack_require__(2);
const DynaDiskMemoryForBrowser_1 = __webpack_require__(1);
class DynaDiskMemoryUniversal {
    constructor(settings) {
        this._test_performDiskDelay = 0;
        this._settings = Object.assign({ fragmentSize: 13 }, settings);
        if (settings.diskPath[settings.diskPath.length - 1] !== '/')
            this._settings.diskPath += '/';
        if (this._isNode(!!this._settings._test_workForBrowser))
            this._memory = new DynaDiskMemoryForNode_1.DynaDiskMemoryForNode(this._settings);
        else
            this._memory = new DynaDiskMemoryForBrowser_1.DynaDiskMemoryForBrowser(this._settings);
        this._memory._test_performDiskDelay = this._test_performDiskDelay;
    }
    set(container, key, data) {
        return this._memory.set(container, key, data);
    }
    get(container, key) {
        return this._memory.get(container, key);
    }
    del(container, key) {
        return this._memory.del(container, key);
    }
    delContainer(container) {
        return this._memory.delContainer(container);
    }
    delAll() {
        return this._memory.delAll();
    }
    _isNode(_test_workForBrowser) {
        if (_test_workForBrowser)
            return false;
        return typeof process === 'object' && typeof process.versions === 'object';
    }
}
exports.DynaDiskMemoryUniversal = DynaDiskMemoryUniversal;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});