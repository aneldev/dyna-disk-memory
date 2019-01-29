var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var DynaDiskMemory = /** @class */ (function () {
    function DynaDiskMemory(settings) {
        this._test_performDiskDelay = 0;
        this._settings = __assign({ fragmentSize: 13 }, settings);
        if (settings.diskPath[settings.diskPath.length - 1] !== '/')
            this._settings.diskPath += '/';
    }
    DynaDiskMemory.prototype.set = function (container, key, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var names = _this._generateFilename(container, key);
                localStorage.setItem(names.full, JSON.stringify(data));
                setTimeout(resolve, _this._test_performDiskDelay);
            }
            catch (err) {
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
                if (typeof rawData == 'string')
                    data = JSON.parse(rawData);
                setTimeout(resolve, _this._test_performDiskDelay, data);
            }
            catch (err) {
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
            Object.keys(localStorage)
                .filter(function (key) { return key.startsWith(names.folder + '/'); })
                .forEach(function (key) { return localStorage.removeItem(key); });
            setTimeout(resolve, _this._test_performDiskDelay);
        });
    };
    DynaDiskMemory.prototype.delAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var names = _this._generateFilename();
            Object.keys(localStorage)
                .filter(function (key) { return key.startsWith(names.base + '/'); })
                .forEach(function (key) { return localStorage.removeItem(key); });
            setTimeout(resolve, _this._test_performDiskDelay);
        });
    };
    DynaDiskMemory.prototype._generateFilename = function (container, key) {
        if (container === void 0) { container = '---'; }
        if (key === void 0) { key = '---'; }
        var full = "dyna-disk-memory/" + this._settings.diskPath + container + "/" + key;
        var base = full.substr(0, full.indexOf('/'));
        var folder = full.substr(0, full.lastIndexOf('/'));
        var file = full.substr(full.lastIndexOf('/') + 1);
        return { full: full, base: base, folder: folder, file: file };
    };
    return DynaDiskMemory;
}());
export { DynaDiskMemory };
//# sourceMappingURL=DynaDiskMemoryForBrowser.js.map