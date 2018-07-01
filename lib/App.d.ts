import "reflect-metadata";
import { Container } from "inversify";
import { GraphQLSchema } from "graphql";
import { IPlugin, IConfiguration } from "./contracts";
import { Express } from "express";
export default class App extends Container {
    private plugins;
    private schemas;
    private resolvers;
    private executableSchema;
    constructor();
    addPlugin(plugin: IPlugin): void;
    register(): Promise<void>;
    init(): Promise<void>;
    addSchema(schema: string): void;
    addResolvers(resolvers: object): void;
    loadGraphQlFromPlugins(): void;
    getSchemas(): string[];
    getResolvers(): object[];
    getExecutableSchema(): GraphQLSchema;
    server(): Express;
    start(): void;
    config(): IConfiguration;
}
