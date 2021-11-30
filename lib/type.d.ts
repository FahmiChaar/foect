import Control from './control';
export declare type Validator = (value: any, config?: any, control?: Control) => ValidatorResult;
export declare type ValidatorResult = null | Errors;
export declare type Model = {
    [key: string]: any;
};
export declare type FormErrors = {
    [name: string]: Errors;
};
export declare type Errors = {
    [key: string]: boolean;
};
export declare type Status = 'INIT' | 'VALID' | 'INVALID';
export declare const Status: {
    INIT: Status;
    VALID: Status;
    INVALID: Status;
};
