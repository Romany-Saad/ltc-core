import { IStringKeyedObject } from "./";
export default interface ISerializable {
    serialize(): IStringKeyedObject;
}
