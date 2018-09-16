/// <reference types="node" />
import 'reflect-metadata';
import { Container } from 'inversify';
import { IPlugin, IConfiguration } from './contracts';
import { Express } from 'express';
import { EventEmitter } from 'events';
export declare const names: {
    APP_SERVICE_SERVER: symbol;
    APP_SERVICE_EXPRESS: symbol;
    APP_SERVICE_CONFIG: symbol;
    EV_PLUGINS_LOADING: symbol;
    EV_PLUGINS_LOADED: symbol;
    EV_SERVER_STARTING: symbol;
    EV_SERVER_STARTED: symbol;
    EV_SERVER_TURNING_OFF: symbol;
    EV_SERVER_TURNED_OFF: symbol;
    EV_DB_INSERTING: symbol;
    EV_DB_INSERTED: symbol;
    EV_DB_UPDATING: symbol;
    EV_DB_UPDATED: symbol;
    EV_DB_DELETING: symbol;
    EV_DB_DELETED: symbol;
};
export default class App extends Container {
    readonly emitter: EventEmitter;
    private _plugins;
    constructor();
    addPlugin(plugin: IPlugin): void;
    getPlugin(name: string): IPlugin;
    load(): Promise<void>;
    start(): Promise<void>;
    readonly express: Express;
    turnOff(): void;
    config(): IConfiguration;
}
