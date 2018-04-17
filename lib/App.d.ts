import "reflect-metadata";
import { Container } from "inversify";
import { IPlugin } from "./contracts";
export default class App extends Container {
    private plugins;
    addPlugin(plugin: IPlugin): void;
    register(): void;
    init(): void;
    config(): object;
}
