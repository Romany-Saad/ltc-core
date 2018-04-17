import "reflect-metadata"
import { Container } from "inversify"
import { IPlugin, IConfiguration } from "./contracts"

export default class App extends Container {

  private plugins: IPlugin[] = []

  /*
  * adds a new plugin to the plugins array to initialize later
  * */
  public addPlugin (plugin: IPlugin) {
    this.plugins.push(plugin)
  }

  /*
  * used to register all plugins and services
  * */
  public register () {
    this.plugins.forEach(plugin => plugin.register(this))
  }

  /*
  * used to initialize plugins after registering them
  * */
  public init () {
    this.plugins.forEach(plugin => plugin.init(this))
  }

  public config (): IConfiguration {
    if (this.isBound('config')) {
      return this.get('config')
    } else {
      throw new Error('configuration object not yet loaded!')
    }
  }

}
