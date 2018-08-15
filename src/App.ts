import "reflect-metadata"
import { Container } from "inversify"
import { IPlugin, IConfiguration } from "./contracts"
import { Express } from "express"
import express from "./express"
import { namer } from "./utils"
import { Server } from "http"

const EventEmitter = require("events")

export const names = {
  APP_SERVICE_SERVER: Symbol(namer.resolve("app", "services", "server")),
  APP_SERVICE_EXPRESS: Symbol(namer.resolve("app", "services", "express")),
  APP_SERVICE_CONFIG: Symbol(namer.resolve("app", "services", "config")),
  EV_PLUGINS_LOADING: Symbol(namer.resolve("app", "plugins", "loading")),
  EV_PLUGINS_LOADED: Symbol(namer.resolve("app", "plugins", "loaded")),
  EV_SERVER_STARTING: Symbol(namer.resolve("app", "server", "starting")),
  EV_SERVER_STARTED: Symbol(namer.resolve("app", "server", "started")),
  EV_SERVER_TURNING_OFF: Symbol(namer.resolve("app", "server", "turningOff")),
  EV_SERVER_TURNED_OFF: Symbol(namer.resolve("app", "server", "turnedOff")),
  EV_DB_INSERTING: Symbol(namer.resolve("app", "db", "inserting")),
  EV_DB_INSERTED: Symbol(namer.resolve("app", "db", "inserted")),
  EV_DB_UPDATING: Symbol(namer.resolve("app", "db", "updating")),
  EV_DB_UPDATED: Symbol(namer.resolve("app", "db", "updated")),
  EV_DB_DELETING: Symbol(namer.resolve("app", "db", "deleting")),
  EV_DB_DELETED: Symbol(namer.resolve("app", "db", "deleted")),
}

export default class App extends Container {
  public emitter = new EventEmitter()
  private _plugins: { [key: string]: IPlugin } = {}

  constructor () {
    super()
    this.bind<Express>(names.APP_SERVICE_EXPRESS).toConstantValue(express)
  }

  /*
  * adds a new plugin to the plugins array to initialize later
  * */
  public addPlugin (plugin: IPlugin) {
    this._plugins[plugin.name] = plugin
  }

  /*
  * gets a plugin from plugins array
  * */
  public getPlugin (name: string): IPlugin {
    return this._plugins[name]
  }

  /*
  * used to load all plugins
  * */
  public async load (): Promise<void> {
    for (let pluginName in this._plugins) {
      await this._plugins[pluginName].load(this)
    }
  }

  public async start (): Promise<void> {
    this.emitter.emit(names.EV_PLUGINS_LOADING, this)
    await this.load()
    this.emitter.emit(names.EV_PLUGINS_LOADED, this)

    const port = this.config().get("http.port") || 8080

    // emitting server-starting event
    this.emitter.emit(names.EV_SERVER_STARTING, this)
    const server = this.express.listen(port, (err: any) => {
      if (!err) {
        console.log(`server is listening to port ${port}`)
        // emitting server-started event
        this.emitter.emit(names.EV_SERVER_STARTED, this)
      } else {
        console.log(err)
      }
    })

    this.bind<Server>(names.APP_SERVICE_SERVER).toConstantValue(server)
  }

  public get express (): Express {
    return this.get(names.APP_SERVICE_EXPRESS)
  }

  public turnOff (): void {
    this.emitter.emit(names.EV_SERVER_TURNING_OFF, this)
    this.get<Server>(names.APP_SERVICE_SERVER).close()
    this.emitter.emit(names.EV_SERVER_TURNED_OFF, this)
  }

  /*
  * returns the configuration container object
  * */
  public config (): IConfiguration {
    if (this.isBound(names.APP_SERVICE_CONFIG)) {
      return this.get(names.APP_SERVICE_CONFIG)
    } else {
      throw new Error('configuration object not yet loaded!')
    }
  }
}
