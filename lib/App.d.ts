import "reflect-metadata";
import { Container } from "inversify";
import { IPlugin, IConfiguration } from "./contracts";
import { GraphQLSchema } from "graphql";
export default class App extends Container {
    private plugins;
    private schemas;
    private resolvers;
    private executableSchema;
    addPlugin(plugin: IPlugin): void;
    register(): void;
    init(): void;
    addSchema(schema: string): void;
    addResolvers(resolvers: object): void;
    loadGraphQlFromPlugins(): void;
    getSchemas(): string[];
    getResolvers(): object[];
    getExecutableSchema(): GraphQLSchema;
    config(): IConfiguration;
}
