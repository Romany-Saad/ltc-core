import App from "../App";
export default interface IPlugin {
    readonly name: string;
    register(container: App): Promise<void>;
    init(container: App): Promise<void>;
    getSchema(): string;
    getResolvers(): object;
}
