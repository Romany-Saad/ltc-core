import { IModel, IStringKeyedObject } from "../contracts";
import { ITypeValidator, IValidationResult } from "c2v/lib/contracts";
export default abstract class BaseModel implements IModel {
    protected id: string;
    protected data: IStringKeyedObject;
    protected schema: ITypeValidator;
    protected state: IValidationResult;
    protected dbState: object;
    constructor(data?: IStringKeyedObject);
    getDbState(): object;
    updateDbState(): void;
    serialize(): IStringKeyedObject;
    set(data: IStringKeyedObject): void;
    get(key: string): any;
    getIdFieldName(): string;
    setId(id: string): void;
    getId(): string;
    getUpdatePatch(): object;
    selfValidate(): Promise<IValidationResult>;
    getResult(): IValidationResult;
    getSchema(): ITypeValidator;
}
