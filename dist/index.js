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
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3efde7cc80468a290d87";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.ts")(__webpack_require__.s = "./src/index.ts");
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
eval("\n\nvar __assign = this && this.__assign || Object.assign || function (t) {\n  for (var s, i = 1, n = arguments.length; i < n; i++) {\n    s = arguments[i];\n\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n  }\n\n  return t;\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar DynaDiskMemoryForBrowser =\n/** @class */\nfunction () {\n  function DynaDiskMemoryForBrowser(settings) {\n    this._test_performDiskDelay = 0;\n    this._settings = __assign({\n      fragmentSize: 13\n    }, settings);\n    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';\n  }\n\n  DynaDiskMemoryForBrowser.prototype.set = function (container, key, data) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      try {\n        var names = _this._generateFilename(container, key);\n\n        localStorage.setItem(names.full, JSON.stringify(data));\n        setTimeout(resolve, _this._test_performDiskDelay);\n      } catch (err) {\n        setTimeout(reject, _this._test_performDiskDelay, err);\n      }\n    });\n  };\n\n  DynaDiskMemoryForBrowser.prototype.get = function (container, key) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      try {\n        var names = _this._generateFilename(container, key);\n\n        var rawData = localStorage.getItem(names.full);\n        var data = undefined;\n        if (typeof rawData == 'string') data = JSON.parse(rawData);\n        setTimeout(resolve, _this._test_performDiskDelay, data);\n      } catch (err) {\n        setTimeout(reject, _this._test_performDiskDelay, err);\n      }\n    });\n  };\n\n  DynaDiskMemoryForBrowser.prototype.del = function (container, key) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      var names = _this._generateFilename(container, key);\n\n      localStorage.removeItem(names.full);\n      setTimeout(resolve, _this._test_performDiskDelay);\n    });\n  };\n\n  DynaDiskMemoryForBrowser.prototype.delContainer = function (container) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      var names = _this._generateFilename(container);\n\n      Object.keys(localStorage).filter(function (key) {\n        return key.startsWith(names.folder + '/');\n      }).forEach(function (key) {\n        return localStorage.removeItem(key);\n      });\n      setTimeout(resolve, _this._test_performDiskDelay);\n    });\n  };\n\n  DynaDiskMemoryForBrowser.prototype.delAll = function () {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      var names = _this._generateFilename();\n\n      Object.keys(localStorage).filter(function (key) {\n        return key.startsWith(names.base + '/');\n      }).forEach(function (key) {\n        return localStorage.removeItem(key);\n      });\n      setTimeout(resolve, _this._test_performDiskDelay);\n    });\n  };\n\n  DynaDiskMemoryForBrowser.prototype._generateFilename = function (container, key) {\n    if (container === void 0) {\n      container = '---';\n    }\n\n    if (key === void 0) {\n      key = '---';\n    }\n\n    var full = \"dyna-disk-memory/\" + this._settings.diskPath + container + \"/\" + key;\n    var base = full.substr(0, full.indexOf('/'));\n    var folder = full.substr(0, full.lastIndexOf('/'));\n    var file = full.substr(full.lastIndexOf('/') + 1);\n    return {\n      full: full,\n      base: base,\n      folder: folder,\n      file: file\n    };\n  };\n\n  return DynaDiskMemoryForBrowser;\n}();\n\nexports.DynaDiskMemoryForBrowser = DynaDiskMemoryForBrowser;\n\n//# sourceURL=webpack://dyna-disk-memory/./src/DynaDiskMemoryForBrowser.ts?");

/***/ }),

/***/ "./src/DynaDiskMemoryForNode.ts":
/*!**************************************!*\
  !*** ./src/DynaDiskMemoryForNode.ts ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || Object.assign || function (t) {\n  for (var s, i = 1, n = arguments.length; i < n; i++) {\n    s = arguments[i];\n\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n  }\n\n  return t;\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar exec = __webpack_require__(/*! child_process */ \"child_process\").exec;\n\nvar dyna_job_queue_1 = __webpack_require__(/*! dyna-job-queue */ \"dyna-job-queue\");\n\nvar dyna_node_fs_1 = __webpack_require__(/*! dyna-node-fs */ \"dyna-node-fs\");\n\nvar md5 = __webpack_require__(/*! md5 */ \"md5\");\n\nvar DynaDiskMemoryForNode =\n/** @class */\nfunction () {\n  function DynaDiskMemoryForNode(settings) {\n    this._jogQueue = new dyna_job_queue_1.DynaJobQueue();\n    this._test_performDiskDelay = 0;\n    this._settings = __assign({\n      fragmentSize: 13\n    }, settings);\n    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';\n    if (this._test_performDiskDelay) console.warn('DynaDiskMemory is working with _test_performDiskDelay not zero, this means will perform intentional delays, this should be not set like this on production');\n  }\n\n  DynaDiskMemoryForNode.prototype.set = function (container, key, data) {\n    var _this = this;\n\n    return this._jogQueue.addJobPromise(function (resolve, reject) {\n      _this._saveFile(container, key, data).then(function () {\n        return resolve();\n      }).catch(reject);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype.get = function (container, key) {\n    var _this = this;\n\n    return this._jogQueue.addJobPromise(function (resolve, reject) {\n      _this._loadFile(container, key).then(resolve).catch(reject);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype.del = function (container, key) {\n    var _this = this;\n\n    return this._jogQueue.addJobPromise(function (resolve, reject) {\n      var fileInfo = _this._generateFilename(container, key);\n\n      dyna_node_fs_1.deleteFile(fileInfo.full).then(function () {\n        return _this._deleteEmptyFolderPath(fileInfo);\n      }).then(function () {\n        return resolve();\n      }).catch(reject);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._deleteEmptyFolderPath = function (fileInfo) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      var foldersToDel = [];\n      var folder = fileInfo.folder;\n\n      while (folder.length && folder !== _this._settings.diskPath.slice(0, -1)) {\n        foldersToDel.push(folder);\n        folder = folder.substr(0, folder.lastIndexOf('/'));\n      }\n\n      var folderToDel = foldersToDel.shift();\n\n      var run = function () {\n        if (folderToDel) {\n          _this._deleteEmptyFolder(folderToDel).then(function () {\n            folderToDel = foldersToDel.shift();\n            if (folderToDel) run();else resolve();\n          }).catch(reject);\n        } else {\n          resolve(); // no folder\n        }\n      };\n\n      run(); // start\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._deleteEmptyFolder = function (folder) {\n    return dyna_node_fs_1.isFolderEmpty(folder).then(function (isEmpty) {\n      if (!isEmpty) return;\n      return dyna_node_fs_1.rmdir(folder);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype.delContainer = function (container) {\n    var _this = this;\n\n    return this._jogQueue.addJobPromise(function (resolve, reject) {\n      var folder = _this._generateFilename(container).folder;\n\n      dyna_node_fs_1.rmdir(folder).then(function () {\n        return resolve();\n      }).catch(reject);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype.delAll = function () {\n    var _this = this;\n\n    return this._jogQueue.addJobPromise(function (resolve, reject) {\n      dyna_node_fs_1.rmdir(_this._settings.diskPath).then(function () {\n        return resolve();\n      }).catch(reject);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._saveFile = function (container, key, data) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      var fileNames = _this._generateFilename(container, key);\n\n      _this._createDirectory(fileNames.folder).then(function () {\n        _this._writeFileOnDisk(fileNames.folder, fileNames.file, data).then(function () {\n          return resolve();\n        }).catch(reject);\n      }).catch(reject);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._loadFile = function (container, key) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      var fileNames = _this._generateFilename(container, key);\n\n      _this._readFileFromDisk(fileNames.folder, fileNames.file).then(function (data) {\n        return resolve(data);\n      }).catch(function (error) {\n        return resolve(undefined);\n      });\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._createDirectory = function (directory) {\n    // todo: make this async\n    return new Promise(function (resolve, reject) {\n      try {\n        var sep = '/'; //path.sep;\n\n        var initDir = path.isAbsolute(directory) ? sep : '';\n        directory.split(sep).reduce(function (parentDir, childDir) {\n          var curDir = path.resolve(parentDir, childDir);\n          if (!fs.existsSync(curDir)) fs.mkdirSync(curDir);\n          return curDir;\n        }, initDir);\n        resolve();\n      } catch (err) {\n        reject(err);\n      }\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._writeFileOnDisk = function (folder, fileName, data) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      var fullPath = folder + \"/\" + fileName;\n      setTimeout(function () {\n        fs.exists(fullPath, function (exists) {\n          if (exists) fs.unlinkSync(fullPath);\n          fs.writeFile(\"\" + fullPath, JSON.stringify(data), function (err) {\n            if (err) reject({\n              errorMessage: \"Cannot write file [\" + fullPath + \"]\",\n              error: err\n            });else resolve();\n          });\n        });\n      }, _this._test_performDiskDelay);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._readFileFromDisk = function (folder, fileName) {\n    var _this = this;\n\n    return new Promise(function (resolve, reject) {\n      setTimeout(function () {\n        var fullFileName = folder + \"/\" + fileName;\n        fs.exists(fullFileName, function (exists) {\n          if (exists) {\n            fs.readFile(fullFileName, 'utf8', function (err, data) {\n              if (err) reject({\n                code: 1802241812,\n                errorMessage: \"Cannot read file [\" + fullFileName + \"]\",\n                error: err\n              });else try {\n                resolve(JSON.parse(data));\n              } catch (error) {\n                reject({\n                  code: 1802241811,\n                  errorMessage: \"Cannot parse file [\" + fullFileName + \"]\",\n                  error: err\n                });\n              }\n            });\n          } else {\n            reject({\n              code: 1802241813,\n              errorMessage: \"DynaDiskMemory: _readFileFromDisk: cannot find to read file for folder [\" + folder + \"] and fileName [\" + fileName + \"]\",\n              fullFileName: fullFileName\n            });\n          }\n        });\n      }, _this._test_performDiskDelay);\n    });\n  };\n\n  DynaDiskMemoryForNode.prototype._generateFilename = function (container, key) {\n    if (key === void 0) {\n      key = '';\n    }\n\n    var generatedContainer = this._getAsciiCodeHash(container);\n\n    var generatedKey = this._splitText(this._getAsciiCodeHash(key), this._settings.fragmentSize, '/');\n\n    var full = \"\" + this._settings.diskPath + generatedContainer + \"/\" + generatedKey;\n    var folder = full.substr(0, full.lastIndexOf('/'));\n    var file = full.substr(full.lastIndexOf('/') + 1);\n    var containerBase = generatedContainer + \"/\" + generatedKey;\n    containerBase = containerBase.substr(0, containerBase.lastIndexOf('/'));\n    return {\n      full: full,\n      folder: folder,\n      file: file,\n      containerBase: containerBase\n    };\n  };\n\n  DynaDiskMemoryForNode.prototype._getAsciiCodeHash = function (key) {\n    return md5(key);\n  };\n\n  DynaDiskMemoryForNode.prototype._splitText = function (text, step, separetor) {\n    var output = \"\";\n    var se = text.split('').reverse();\n\n    while (se.length) output += se.splice(0, step).join('') + separetor;\n\n    if (output[output.length - 1] == separetor) output += '_fc';\n    return output;\n  };\n\n  return DynaDiskMemoryForNode;\n}();\n\nexports.DynaDiskMemoryForNode = DynaDiskMemoryForNode;\n\n//# sourceURL=webpack://dyna-disk-memory/./src/DynaDiskMemoryForNode.ts?");

/***/ }),

/***/ "./src/DynaDiskMemoryUniversal.ts":
/*!****************************************!*\
  !*** ./src/DynaDiskMemoryUniversal.ts ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || Object.assign || function (t) {\n  for (var s, i = 1, n = arguments.length; i < n; i++) {\n    s = arguments[i];\n\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n  }\n\n  return t;\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar dyna_universal_1 = __webpack_require__(/*! dyna-universal */ \"dyna-universal\");\n\nvar DynaDiskMemoryForBrowser_1 = __webpack_require__(/*! ./DynaDiskMemoryForBrowser */ \"./src/DynaDiskMemoryForBrowser.ts\");\n\nvar DynaDiskMemoryForNode_1 = __webpack_require__(/*! ./DynaDiskMemoryForNode */ \"./src/DynaDiskMemoryForNode.ts\");\n\nvar DynaDiskMemoryUniversal =\n/** @class */\nfunction () {\n  function DynaDiskMemoryUniversal(settings) {\n    this._test_performDiskDelay = 0;\n    this._settings = __assign({\n      fragmentSize: 13,\n      _test_workForBrowser: false,\n      _test_performDiskDelay: 0\n    }, settings);\n    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';\n    if (this._settings._test_workForBrowser) this._memory = new DynaDiskMemoryForBrowser_1.DynaDiskMemoryForBrowser(this._settings);else if (dyna_universal_1.isNode()) this._memory = new DynaDiskMemoryForNode_1.DynaDiskMemoryForNode(this._settings);else this._memory = new DynaDiskMemoryForBrowser_1.DynaDiskMemoryForBrowser(this._settings);\n    this._memory._test_performDiskDelay = this._test_performDiskDelay;\n  }\n\n  DynaDiskMemoryUniversal.prototype.set = function (container, key, data) {\n    return this._memory.set(container, key, data);\n  };\n\n  DynaDiskMemoryUniversal.prototype.get = function (container, key) {\n    return this._memory.get(container, key);\n  };\n\n  DynaDiskMemoryUniversal.prototype.del = function (container, key) {\n    return this._memory.del(container, key);\n  };\n\n  DynaDiskMemoryUniversal.prototype.delContainer = function (container) {\n    return this._memory.delContainer(container);\n  };\n\n  DynaDiskMemoryUniversal.prototype.delAll = function () {\n    return this._memory.delAll();\n  };\n\n  return DynaDiskMemoryUniversal;\n}();\n\nexports.DynaDiskMemoryUniversal = DynaDiskMemoryUniversal;\n\n//# sourceURL=webpack://dyna-disk-memory/./src/DynaDiskMemoryUniversal.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar DynaDiskMemoryUniversal_1 = __webpack_require__(/*! ./DynaDiskMemoryUniversal */ \"./src/DynaDiskMemoryUniversal.ts\");\n\nexports.DynaDiskMemory = DynaDiskMemoryUniversal_1.DynaDiskMemoryUniversal;\n\n//# sourceURL=webpack://dyna-disk-memory/./src/index.ts?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack://dyna-disk-memory/external_%22child_process%22?");

/***/ }),

/***/ "dyna-job-queue":
/*!*********************************!*\
  !*** external "dyna-job-queue" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"dyna-job-queue\");\n\n//# sourceURL=webpack://dyna-disk-memory/external_%22dyna-job-queue%22?");

/***/ }),

/***/ "dyna-node-fs":
/*!*******************************!*\
  !*** external "dyna-node-fs" ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"dyna-node-fs\");\n\n//# sourceURL=webpack://dyna-disk-memory/external_%22dyna-node-fs%22?");

/***/ }),

/***/ "dyna-universal":
/*!*********************************!*\
  !*** external "dyna-universal" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"dyna-universal\");\n\n//# sourceURL=webpack://dyna-disk-memory/external_%22dyna-universal%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_fs__;\n\n//# sourceURL=webpack://dyna-disk-memory/external_%22fs%22?");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"md5\");\n\n//# sourceURL=webpack://dyna-disk-memory/external_%22md5%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_path__;\n\n//# sourceURL=webpack://dyna-disk-memory/external_%22path%22?");

/***/ })

/******/ });
});