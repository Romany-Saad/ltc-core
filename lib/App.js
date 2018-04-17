"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
class App extends inversify_1.Container {
    constructor() {
        super(...arguments);
        this.plugins = [];
    }
    /*
    * adds a new plugin to the plugins array to initialize later
    * */
    addPlugin(plugin) {
        this.plugins.push(plugin);
    }
    /*
    * used to register all plugins and services
    * */
    register() {
        this.plugins.forEach(plugin => plugin.register(this));
    }
    /*
    * used to initialize plugins after registering them
    * */
    init() {
        this.plugins.forEach(plugin => plugin.init(this));
    }
    config() {
        if (this.isBound('config')) {
            return this.get('config');
        }
        else {
            throw new Error('configuration object not yet loaded!');
        }
    }
}
exports.default = App;
