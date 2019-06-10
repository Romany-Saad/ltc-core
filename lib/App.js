"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const express_1 = require("./express");
const utils_1 = require("./utils");
const Emitter_1 = require("./Emitter");
const ResourceMapper_1 = require("./classes/ResourceMapper");
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
class App extends inversify_1.Container {
    constructor() {
        super();
        this.emitter = Emitter_1.default;
        this._plugins = {};
        this._resourceMapper = new ResourceMapper_1.default();
        this.bind(exports.names.APP_SERVICE_EXPRESS).toConstantValue(express_1.default);
    }
    /**
     * retrieves the resource mapper object
     * */
    get resourceMapper() {
        return this._resourceMapper;
    }
    /**
     * adds a new plugin to the plugins array to initialize later
     * */
    addPlugin(plugin) {
        if (plugin.name.trim().length < 1)
            throw new Error(`plugin doesn't hold a valid name property.`);
        if (this._plugins.hasOwnProperty(plugin.name))
            throw new Error(`a plugin with the same name ${plugin.name} already exists.`);
        this._plugins[plugin.name] = plugin;
    }
    /**
     * gets a plugin from plugins array
     * */
    getPlugin(name) {
        return this._plugins[name];
    }
    /**
     * used to load all plugins
     * */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitter.emit(exports.names.EV_PLUGINS_LOADING, this);
            for (let pluginName in this._plugins) {
                yield this._plugins[pluginName].load(this);
            }
            this.emitter.emit(exports.names.EV_PLUGINS_LOADED, this);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.load();
            const port = this.config().get('http.port') || 8080;
            // emitting server-starting event
            this.emitter.emit(exports.names.EV_SERVER_STARTING, this);
            const server = this.express.listen(port, (err) => {
                if (!err) {
                    console.log(`server is listening to port ${port}`);
                    // emitting server-started event
                    this.emitter.emit(exports.names.EV_SERVER_STARTED, this);
                }
                else {
                    console.log(err);
                }
            });
            this.bind(exports.names.APP_SERVICE_SERVER).toConstantValue(server);
        });
    }
    get express() {
        return this.get(exports.names.APP_SERVICE_EXPRESS);
    }
    turnOff() {
        this.emitter.emit(exports.names.EV_SERVER_TURNING_OFF, this);
        this.get(exports.names.APP_SERVICE_SERVER).close();
        this.emitter.emit(exports.names.EV_SERVER_TURNED_OFF, this);
    }
    /*
    * returns the configuration container object
    * */
    config() {
        if (this.isBound(exports.names.APP_SERVICE_CONFIG)) {
            return this.get(exports.names.APP_SERVICE_CONFIG);
        }
        else {
            throw new Error('configuration object not yet loaded!');
        }
    }
}
exports.default = App;
