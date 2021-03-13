import { IModel, IStringKeyedObject } from '../contracts';
import { ITypeValidator, IValidationResult } from 'c2v/lib/contracts';
import { IComputeProperties, IPropertySerializer } from '../decorators';
export default abstract class BaseModel implements IModel, IComputeProperties {
    __computedFields: IPropertySerializer[];
    protected id: string;
    protected data: IStringKeyedObject;
    protected schema: ITypeValidator;
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
    getSchema(): ITypeValidator;
}
