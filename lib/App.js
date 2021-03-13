"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var express_1 = require("./express");
var utils_1 = require("./utils");
var Emitter_1 = require("./Emitter");
var ResourceMapper_1 = require("./classes/ResourceMapper");
exports.names = {
    APP_SERVICE_SERVER: Symbol(utils_1.namer.resolve('app', 'services', 'server')),
    APP_SERVICE_EXPRESS: Symbol(utils_1.namer.resolve('app', 'services', 'express')),
    APP_SERVICE_CONFIG: Symbol(utils_1.namer.resolve('app', 'services', 'config')),
    EV_PLUGINS_LOADING: Symbol(utils_1.namer.resolve('app', 'plugins', 'loading')),
    EV_PLUGINS_LOADED: Symbol(utils_1.namer.resolve('app', 'plugins', 'loaded')),
    EV_SERVER_STARTING: Symbol(utils_1.namer.resolve('app', 'server', 'starting')),
    EV_SERVER_STARTED: Symbol(utils_1.namer.resolve('app', 'server', 'started')),
    EV_SERVER_TURNING_OFF: Symbol(utils_1.namer.resolve('app', 'server', 'turningOff')),
    EV_SERVER_TURNED_OFF: Symbol(utils_1.namer.resolve('app', 'server', 'turnedOff')),
    EV_DB_INSERTING: Symbol(utils_1.namer.resolve('app', 'db', 'inserting')),
    EV_DB_INSERTED: Symbol(utils_1.namer.resolve('app', 'db', 'inserted')),
    EV_DB_UPDATING: Symbol(utils_1.namer.resolve('app', 'db', 'updating')),
    EV_DB_UPDATED: Symbol(utils_1.namer.resolve('app', 'db', 'updated')),
    EV_DB_DELETING: Symbol(utils_1.namer.resolve('app', 'db', 'deleting')),
    EV_DB_DELETED: Symbol(utils_1.namer.resolve('app', 'db', 'deleted')),
    EV_MODEL_VALIDATING: Symbol(utils_1.namer.resolve('app', 'model', 'validating')),
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.emitter = Emitter_1.default;
        _this._plugins = {};
        _this._resourceMapper = new ResourceMapper_1.default();
        _this.bind(exports.names.APP_SERVICE_EXPRESS).toConstantValue(express_1.default);
        return _this;
    }
    Object.defineProperty(App.prototype, "resourceMapper", {
        /**
         * retrieves the resource mapper object
         * */
        get: function () {
            return this._resourceMapper;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * adds a new plugin to the plugins array to initialize later
     * */
    App.prototype.addPlugin = function (plugin) {
        if (plugin.name.trim().length < 1)
            throw new Error("plugin doesn't hold a valid name property.");
        if (this._plugins.hasOwnProperty(plugin.name))
            throw new Error("a plugin with the same name " + plugin.name + " already exists.");
        this._plugins[plugin.name] = plugin;
    };
    /**
     * gets a plugin from plugins array
     * */
    App.prototype.getPlugin = function (name) {
        return this._plugins[name];
    };
    /**
     * used to load all plugins
     * */
    App.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, pluginName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.emitter.emit(exports.names.EV_PLUGINS_LOADING, this);
                        _a = [];
                        for (_b in this._plugins)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        pluginName = _a[_i];
                        return [4 /*yield*/, this._plugins[pluginName].load(this)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.emitter.emit(exports.names.EV_PLUGINS_LOADED, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port, server;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load()];
                    case 1:
                        _a.sent();
                        port = this.config().get('http.port') || 8080;
                        // emitting server-starting event
                        this.emitter.emit(exports.names.EV_SERVER_STARTING, this);
                        server = this.express.listen(port, function (err) {
                            if (!err) {
                                console.log("server is listening to port " + port);
                                // emitting server-started event
                                _this.emitter.emit(exports.names.EV_SERVER_STARTED, _this);
                            }
                            else {
                                console.log(err);
                            }
                        });
                        this.bind(exports.names.APP_SERVICE_SERVER).toConstantValue(server);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(App.prototype, "express", {
        get: function () {
            return this.get(exports.names.APP_SERVICE_EXPRESS);
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.turnOff = function () {
        this.emitter.emit(exports.names.EV_SERVER_TURNING_OFF, this);
        this.get(exports.names.APP_SERVICE_SERVER).close();
        this.emitter.emit(exports.names.EV_SERVER_TURNED_OFF, this);
    };
    /*
    * returns the configuration container object
    * */
    App.prototype.config = function () {
        if (this.isBound(exports.names.APP_SERVICE_CONFIG)) {
            return this.get(exports.names.APP_SERVICE_CONFIG);
        }
        else {
            throw new Error('configuration object not yet loaded!');
        }
    };
    return App;
}(inversify_1.Container));
exports.default = App;
