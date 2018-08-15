import { IModel, IStringKeyedObject } from "../contracts";
import { ITypeValidator, IValidationResult } from "c2v/lib/contracts";
export default abstract class BaseModel implements IModel {
    protected id: string;
    protected data: IStringKeyedObject;
    protected schema: ITypeValidator;
    protected state: IValidationResult;
    protected readonly initState: object;
    constructor(data?: IStringKeyedObject);
    setId(id: string): void;
    getId(): string;
    getIdFieldName(): string;
    serialize(): IStringKeyedObject;
    set(data: IStringKeyedObject): void;
    get(key: string): any;
    getUpdatePatch(): Array<object>;
    selfValidate(): Promise<IValidationResult>;
    getResult(): IValidationResult;
    getSchema(): ITypeValidator;
}
