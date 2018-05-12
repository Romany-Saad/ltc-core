import "reflect-metadata"
import { Container } from "inversify"
import { makeExecutableSchema } from "graphql-tools"
import { GraphQLSchema } from "graphql"
import { merge } from "lodash"
import { IPlugin, IConfiguration } from "./contracts"
import defaultSchema from "./schema"

export default class App extends Container {

  private plugins: IPlugin[] = []
  private schemas: string[] = []
  private resolvers: object[] = []
  private executableSchema: GraphQLSchema

  constructor () {
    super()
    this.addSchema(defaultSchema)
  }

  /*
  * adds a new plugin to the plugins array to initialize later
  * */
  public addPlugin (plugin: IPlugin) {
    this.plugins.push(plugin)
  }

  /*
  * used to register all plugins and services
  * */
  public register (): Promise<void[]> {
    const promises: Promise<void>[] = []
    this.plugins.forEach(plugin => promises.push(plugin.register(this)))
    return Promise.all(promises)
  }

  /*
  * used to initialize plugins after registering them
  * */
  public init (): Promise<void[]> {
    const promises: Promise<void>[] = []
    this.plugins.forEach(plugin => promises.push(plugin.init(this)))
    return Promise.all(promises)
  }

  /*
  * adds a schema partial to the schema partials that
  * gets merged later to form the GraphQLSchema object
  * */
  public addSchema (schema: string): void {
    this.schemas.push(schema)
  }

  /*
  * adds a resolver map object to the array of resolver
  * map objects to be merged later into one resolver map
  * */
  public addResolvers (resolvers: object): void {
    this.resolvers.push(resolvers)
  }

  /*
  * loads the schema partials and resolvers from plugins
  * */
  public loadGraphQlFromPlugins (): void {
    this.plugins.forEach(plugin => this.addSchema(plugin.getSchema()))
    this.plugins.forEach(plugin => this.addResolvers(plugin.getResolvers()))
  }

  public getSchemas (): string[] {
    return this.schemas
  }

  /*
  * returns an array of resolver maps (plain object
  * that holds resolvers)
  * */
  public getResolvers (): object[] {
    return this.resolvers
  }

  /*
  * generates a GraphQLSchema object out of loaded
  * schema partials and resolvers
  * */
  getExecutableSchema (): GraphQLSchema {
    if (this.executableSchema) return this.executableSchema
    // generating new schema if not already generated
    const resolvers = {}
    this.getResolvers().forEach(resolver => merge(resolvers, resolver))
    this.executableSchema = makeExecutableSchema({
      typeDefs: this.getSchemas(),
      resolvers: resolvers
    })
    return this.executableSchema
  }

  /*
  * returns the configuration container object
  * @throw
  * */
  public config (): IConfiguration {
    if (this.isBound('config')) {
      return this.get('config')
    } else {
      throw new Error('configuration object not yet loaded!')
    }
  }

}
