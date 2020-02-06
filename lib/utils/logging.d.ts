import { ILog } from '../abstractions/ILog';
import { IErrorLog } from '../abstractions/IErrorLog';
import { IInfoLog } from '../abstractions/IInfoLog';
export declare class Logger {
    private originalInstance;
    constructor();
    getOriginalLoggerInstance(): any;
    info(data: IInfoLog): any;
    error(data: IErrorLog): any;
    log(data: ILog): void;
}
export declare const logger: Logger;
export declare const winstonErrorHandler: (err: any, req: any, res: any, next: any) => void;
