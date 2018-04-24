"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
class App extends inversify_1.Container {
    constructor() {
        super(...arguments);
        this.plugins = [];
        this.schemas = [];
        this.resolvers = [];
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
    /*
    * adds a schema partial to the schema partials that
    * gets merged later to form the GraphQLSchema object
    * */
    addSchema(schema) {
        this.schemas.push(schema);
    }
    /*
    * adds a resolver map object to the array of resolver
    * map objects to be merged later into one resolver map
    * */
    addResolvers(resolvers) {
        this.resolvers.push(resolvers);
    }
    /*
    * loads the schema partials and resolvers from plugins
    * */
    loadGraphQlFromPlugins() {
        this.plugins.forEach(plugin => this.addSchema(plugin.getSchema()));
        this.plugins.forEach(plugin => this.addResolvers(plugin.getResolvers()));
    }
    getSchemas() {
        return this.schemas;
    }
    /*
    * returns an array of resolver maps (plain object
    * that holds resolvers)
    * */
    getResolvers() {
        return this.resolvers;
    }
    /*
    * generates a GraphQLSchema object out of loaded
    * schema partials and resolvers
    * */
    getExecutableSchema() {
        if (this.executableSchema)
            return this.executableSchema;
        // generating new schema if not already generated
        const resolvers = {};
        this.getResolvers().forEach(resolver => lodash_1.merge(resolvers, resolver));
        this.executableSchema = graphql_tools_1.makeExecutableSchema({
            typeDefs: this.getSchemas(),
            resolvers: resolvers
        });
        return this.executableSchema;
    }
    /*
    * returns the configuration container object
    * @throw
    * */
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
