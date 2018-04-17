import "reflect-metadata";
import { Container } from "inversify";
import { IPlugin, IConfiguration } from "./contracts";
export default class App extends Container {
    private plugins;
    addPlugin(plugin: IPlugin): void;
    register(): void;
    init(): void;
    config(): IConfiguration;
}
