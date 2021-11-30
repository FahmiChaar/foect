/// <reference types="react" />
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Status, Errors } from './type';
import Form from './form';
export interface Props {
    name: string;
    children: (control: Control) => JSX.Element;
    defaultValue: any;
    [validator: string]: any;
}
export interface State {
    touched: boolean;
}
export interface Context {
    form: Form;
}
export default class Control extends Component<Props, State> {
    context: Context;
    static contextTypes: {
        form: PropTypes.Validator<any>;
    };
    static propTypes: {
        name: PropTypes.Validator<any>;
        children: PropTypes.Validator<any>;
        defaultValue: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        defaultValue: string;
    };
    constructor(props: Props, context: Context);
    readonly value: any;
    readonly form: Form;
    readonly status: Status;
    readonly errors: Errors;
    readonly isValid: boolean;
    readonly isInvalid: boolean;
    readonly isTouched: boolean;
    readonly isUntouched: boolean;
    UNSAFE_componentWillMount(): void;
    UNSAFE_componentDidUpdate(prevProps: Props): void;
    UNSAFE_componentWillUnmount(): void;
    onChange(value: any): void;
    markAsTouched(): void;
    markAsUntouched(): void;
    runValidation(value: any): Errors;
    render(): JSX.Element;
}
