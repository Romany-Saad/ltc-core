import App from "../App";
export default interface IPlugin {
    readonly name: string;
    register(container: App): void;
    init(container: App): void;
}
