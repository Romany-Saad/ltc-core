import { ErrorObject, ValidateFunction } from "ajv";
import { IModel, IStringKeyedObject } from "../contracts";
export default abstract class BaseModel implements IModel {
    protected data: IStringKeyedObject;
    protected id: string;
    protected removeAdditional: boolean;
    protected validateFunction: ValidateFunction;
    protected abstract schema: IStringKeyedObject;
    protected idSchema: IStringKeyedObject;
    protected constructor(data?: IStringKeyedObject);
    setId(id: string): void;
    getId(): string;
    abstract parse(data: IStringKeyedObject): IModel;
    getIdFieldName(): string;
    serialize(): IStringKeyedObject;
    set(data: IStringKeyedObject): void;
    selfValidate(): boolean;
    getErrors(): ErrorObject[];
    getSchema(): IStringKeyedObject;
}
