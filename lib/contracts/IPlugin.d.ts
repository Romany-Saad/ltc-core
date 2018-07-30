import App from "../App";
export default interface IPlugin {
    readonly name: string;
    load(container: App): Promise<void>;
}
