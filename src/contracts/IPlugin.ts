import App from "../App";

/*
* every plugin must implement this interface, the main goal of this
* interface is to force the right steps in which all plugins should
* be initialized
* */
export default interface IPlugin {
  /*
  * used to provide access to the App container to register all
  * services provided by the plugin
  *
  * on this step there it is not guaranteed that certain services
  * has been attached to the container or not, but it's the right
  * place to register plugin services or inject some values into
  * the container
  * */
  register(container: App): void

  /*
  * on this point dependencies has been injected into the container
  * from the register function so it's a good point for code that
  * depends on services from other plugins/services
  * */
  init(): void
}

