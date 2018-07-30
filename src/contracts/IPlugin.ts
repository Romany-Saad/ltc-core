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
  * used to provide access to the App container to load
  * plugin's resources
  * */
  load (container: App): Promise<void>

}

