import App from "../App";
export default interface IPlugin {
    register(container: App): void;
    init(container: App): void;
}
