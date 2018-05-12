import App from "../App"

/*
* every plugin must implement this interface, the main goal of this
* interface is to force the right steps in which all plugins should
* be initialized
* */
export default interface IPlugin {

  /*
  * the name of this plugin
  * */
  readonly name: string

  /*
  * used to provide access to the App container to register all
  * services provided by the plugin
  *
  * on this step there it is not guaranteed that certain services
  * has been attached to the container or not, but it's the right
  * place to register independent services or inject some values
  * into the container
  * */
  register (container: App): Promise<void>

  /*
  * on this point dependencies has been injected into the container
  * from the register function so it's a good point for code that
  * depends on services from other plugins/services
  * */
  init (container: App): Promise<void>

  /*
  * returns the GraphQl schema to merged with other schemas
  * this method is requested by the app after init()
  * */
  getSchema (): string

  /*
  * returns resolvers for the given schema
  * this method is requested by the app after getSchema()
  * */
  getResolvers (): object

}

