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
const apollo_server_express_1 = require("apollo-server-express");
require("reflect-metadata");
const inversify_1 = require("inversify");
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
const schema_1 = require("./schema");
const express_1 = require("./express");
const bodyParser = require('body-parser');
class App extends inversify_1.Container {
    constructor() {
        super();
        this.plugins = [];
        this.schemas = [];
        this.resolvers = [];
        this.addSchema(schema_1.default);
        this.bind("server").toConstantValue(express_1.default);
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
        return __awaiter(this, void 0, void 0, function* () {
            for (const plugin of this.plugins) {
                yield plugin.register(this);
            }
        });
    }
    /*
    * used to initialize plugins after registering them
    * */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const plugin of this.plugins) {
                yield plugin.init(this);
            }
        });
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
    server() {
        return this.get("server");
    }
    start() {
        const port = this.config().value().http.port || 80;
        // The GraphQL endpoint
        const schema = this.getExecutableSchema();
        express_1.default.use('/graphql', bodyParser.json(), apollo_server_express_1.graphqlExpress({
            schema,
            rootValue: this
        }));
        // GraphiQL, a visual editor for queries
        express_1.default.use('/graphiql', apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
        this.server().listen(port, () => {
            console.log(`server is listening on port ${port} Go to http://localhost:${port}/graphiql to run queries!`);
        });
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
