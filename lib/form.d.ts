/// <reference types="react" />
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { FormErrors, Errors, Model, Status } from './type';
import Control from './control';
export interface Props {
    children: (form: Form) => JSX.Element;
    defaultValue?: Model;
    onChange?: (model: Model) => void;
    onValidSubmit?: (model: Model) => void;
    onInvalidSubmit?: (errors: FormErrors, model: Model) => void;
}
export interface State {
    value: Model;
    controls: Map<string, Control>;
    errors: FormErrors;
    status: {
        [name: string]: Status;
    };
    submitted: boolean;
}
export default class Form extends Component<Props, State> {
    mounted: boolean;
    static childContextTypes: {
        form: PropTypes.Requireable<any>;
    };
    static propTypes: {
        children: PropTypes.Validator<any>;
        defaultValue: PropTypes.Requireable<any>;
        onValidSubmit: PropTypes.Requireable<any>;
        onInvalidSubmit: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        defaultValue: {};
    };
    constructor(props: Props);
    UNSAFE_componentWillMount(): void;
    UNSAFE_componentWillUnmount(): void;
    readonly status: Status;
    readonly errors: FormErrors;
    readonly isValid: boolean;
    readonly isInvalid: boolean;
    readonly isSubmitted: boolean;
    getChildContext(): {
        form: Form;
    };
    addControl(name: string, control: Control): void;
    removeControl(name: string): void;
    getValue(name: string): any;
    setValue(name: string, value: any): void;
    setErrors(name: string, errors: Errors): void;
    validateControl(name: string): void;
    getStatus(name: string): Status;
    getErrors(name: string): Errors;
    update(): void;
    submit(): void;
    handleSubmit(): void;
    onChange(): void;
    onInvalidSubmit(): void;
    onValidSubmit(): void;
    render(): JSX.Element;
}
