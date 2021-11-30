import Form from './form';
import Control from './control';
declare var _default: {
    Form: typeof Form;
    Control: typeof Control;
    Validators: {
        delete(v: string): boolean;
        add(v: string, fn: (value: any, config?: any, control?: Control | undefined) => {
            [key: string]: boolean;
        } | null): Map<string, (value: any, config?: any, control?: Control | undefined) => {
            [key: string]: boolean;
        } | null>;
        get(v: string): ((value: any, config?: any, control?: Control | undefined) => {
            [key: string]: boolean;
        } | null) | undefined;
        has(v: string): boolean;
    };
};
export default _default;
