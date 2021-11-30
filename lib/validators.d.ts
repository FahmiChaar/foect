import { Validator } from './type';
declare var _default: {
    delete(v: string): boolean;
    add(v: string, fn: Validator): Map<string, Validator>;
    get(v: string): Validator | undefined;
    has(v: string): boolean;
};
export default _default;
