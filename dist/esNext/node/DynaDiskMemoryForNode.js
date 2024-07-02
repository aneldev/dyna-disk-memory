import * as fs from "fs";
import * as path from "path";
import * as md5 from 'md5';
import { DynaJobQueue } from "dyna-job-queue";
import { deleteFile, isFolderEmpty, rmdir, } from "dyna-node-fs";
var DynaDiskMemory = /** @class */ (function () {
    function DynaDiskMemory(_settings) {
        this._settings = _settings;
        this._jogQueue = new DynaJobQueue();
        this._test_performDiskDelay = 0;
        if (this._settings.diskPath[this._settings.diskPath.length - 1] !== path.sep)
            this._settings.diskPath += path.sep;
        if (this._test_performDiskDelay)
            console.warn('DynaDiskMemory is working with _test_performDiskDelay not zero, this means will perform intentional delays, this should be not set like this on production');
    }
    DynaDiskMemory.prototype.set = function (container, key, data) {
        var _this = this;
        return this._jogQueue.addJobPromise(function (resolve, reject) {
            _this._saveFile(container, key, data)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    DynaDiskMemory.prototype.get = function (container, key) {
        var _this = this;
        return this._jogQueue.addJobPromise(function (resolve, reject) {
            _this._loadFile(container, key)
                .then(resolve)
                .catch(reject);
        });
    };
    DynaDiskMemory.prototype.del = function (container, key) {
        var _this = this;
        return this._jogQueue.addJobPromise(function (resolve, reject) {
            var fileInfo = _this._generateFilename(container, key);
            deleteFile(fileInfo.full)
                .then(function () { return _this._deleteEmptyFolderPath(fileInfo); })
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    DynaDiskMemory.prototype._deleteEmptyFolderPath = function (fileInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var foldersToDel = [];
            var folder = fileInfo.folder;
            while (folder.length && folder !== _this._settings.diskPath.slice(0, -1)) {
                foldersToDel.push(folder);
                folder = folder.substring(0, folder.lastIndexOf(path.sep));
            }
            var folderToDel = foldersToDel.shift();
            var run = function () {
                if (folderToDel) {
                    _this._deleteEmptyFolder(folderToDel)
                        .then(function () {
                        folderToDel = foldersToDel.shift();
                        if (folderToDel)
                            run();
                        else
                            resolve();
                    })
                        .catch(reject);
                }
                else {
                    resolve(); // No folder
                }
            };
            run(); // Start
        });
    };
    DynaDiskMemory.prototype._deleteEmptyFolder = function (folder) {
        return isFolderEmpty(folder)
            .then(function (isEmpty) {
            if (!isEmpty)
                return;
            return rmdir(folder);
        });
    };
    DynaDiskMemory.prototype.delContainer = function (container) {
        var _this = this;
        return this._jogQueue.addJobPromise(function (resolve, reject) {
            var folder = _this._generateFilename(container).folder;
            rmdir(folder).then(function () { return resolve(); })
                .catch(reject);
        });
    };
    DynaDiskMemory.prototype.delAll = function () {
        var _this = this;
        return this._jogQueue.addJobPromise(function (resolve, reject) {
            rmdir(_this._settings.diskPath).then(function () { return resolve(); })
                .catch(reject);
        });
    };
    DynaDiskMemory.prototype._saveFile = function (container, key, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileNames = _this._generateFilename(container, key);
            _this._createDirectory(fileNames.folder)
                .then(function () {
                _this._writeFileOnDisk(fileNames.folder, fileNames.file, data)
                    .then(function () { return resolve(); })
                    .catch(reject);
            })
                .catch(reject);
        });
    };
    DynaDiskMemory.prototype._loadFile = function (container, key) {
        var _this = this;
        return new Promise(function (resolve) {
            var fileNames = _this._generateFilename(container, key);
            _this._readFileFromDisk(fileNames.folder, fileNames.file)
                .then(function (data) { return resolve(data); })
                .catch(function () { return resolve(undefined); });
        });
    };
    DynaDiskMemory.prototype._createDirectory = function (directory) {
        // Todo: make this async
        return new Promise(function (resolve, reject) {
            try {
                var sep = path.sep;
                var initDir = path.isAbsolute(directory) ? sep : '';
                directory.split(sep).reduce(function (parentDir, childDir) {
                    var curDir = path.resolve(parentDir, childDir);
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
    };
    DynaDiskMemory.prototype._writeFileOnDisk = function (folder, fileName, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fullPath = "".concat(folder).concat(path.sep).concat(fileName);
            setTimeout(function () {
                fs.exists(fullPath, function (exists) {
                    if (exists)
                        fs.unlinkSync(fullPath);
                    fs.writeFile("".concat(fullPath), JSON.stringify(data), function (err) {
                        if (err) {
                            reject({
                                errorMessage: "Cannot write file [".concat(fullPath, "]"),
                                error: err,
                            });
                        }
                        else {
                            resolve();
                        }
                    });
                });
            }, _this._test_performDiskDelay);
        });
    };
    DynaDiskMemory.prototype._readFileFromDisk = function (folder, fileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var fullFileName = "".concat(folder).concat(path.sep).concat(fileName);
                fs.exists(fullFileName, function (exists) {
                    if (exists) {
                        fs.readFile(fullFileName, 'utf8', function (err, data) {
                            if (err) {
                                reject({
                                    code: 1802241812,
                                    errorMessage: "Cannot read file [".concat(fullFileName, "]"),
                                    error: err,
                                });
                            }
                            else {
                                try {
                                    resolve(JSON.parse(data));
                                }
                                catch (error) {
                                    reject({
                                        code: 1802241811,
                                        errorMessage: "Cannot parse file [".concat(fullFileName, "]"),
                                        error: err,
                                    });
                                }
                            }
                        });
                    }
                    else {
                        reject({
                            code: 1802241813,
                            errorMessage: "DynaDiskMemory: _readFileFromDisk: cannot find to read file for folder [".concat(folder, "] and fileName [").concat(fileName, "]"),
                            fullFileName: fullFileName,
                        });
                    }
                });
            }, _this._test_performDiskDelay);
        });
    };
    DynaDiskMemory.prototype._generateFilename = function (container, key) {
        if (key === void 0) { key = ''; }
        var generatedContainer = this._getAsciiCodeHash(container);
        var generatedKey = this._splitText(this._getAsciiCodeHash(key), this._settings.fragmentSize || 13, path.sep);
        var full = "".concat(this._settings.diskPath).concat(generatedContainer).concat(path.sep).concat(generatedKey);
        var folder = full.substring(0, full.lastIndexOf(path.sep));
        var file = full.substring(full.lastIndexOf(path.sep) + 1);
        var containerBase = "".concat(generatedContainer).concat(path.sep).concat(generatedKey);
        containerBase = containerBase.substring(0, containerBase.lastIndexOf(path.sep));
        return {
            full: full,
            folder: folder,
            file: file,
            containerBase: containerBase,
        };
    };
    DynaDiskMemory.prototype._getAsciiCodeHash = function (key) {
        return md5(key);
    };
    DynaDiskMemory.prototype._splitText = function (text, step, separetor) {
        var output = "";
        var se = text.split('').reverse();
        while (se.length)
            output += se.splice(0, step).join('') + separetor;
        if (output[output.length - 1] === separetor)
            output += '_fc';
        return output;
    };
    return DynaDiskMemory;
}());
export { DynaDiskMemory };
//# sourceMappingURL=DynaDiskMemoryForNode.js.map