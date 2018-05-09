import { ErrorObject, ValidateFunction } from "ajv";
import { IModel, IStringKeyedObject } from "../contracts";
export default abstract class BaseModel implements IModel {
    protected data: IStringKeyedObject;
    protected id: string;
    protected validateFunction: ValidateFunction;
    protected constructor(data?: IStringKeyedObject);
    setId(id: string): void;
    getId(): string;
    getIdFieldName(): string;
    serialize(): IStringKeyedObject;
    set(data: IStringKeyedObject): void;
    selfValidate(): boolean;
    getErrors(): ErrorObject[];
    abstract getSchema(): IStringKeyedObject | string;
}