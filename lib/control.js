"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PropTypes = require("prop-types");
const type_1 = require("./type");
const validators_1 = require("./validators");
// We have to use `require`
// Visit the link below for more information
// https://stackoverflow.com/a/39415662
const isEqual = require('lodash.isequal');
function isValidationRulesChanged(currentProps, nextProps) {
    const oldRules = Object.keys(currentProps).filter(validators_1.default.has);
    const newRules = Object.keys(nextProps).filter(validators_1.default.has);
    if (oldRules.length !== newRules.length) {
        return true;
    }
    for (const rule of oldRules) {
        if ('function' !== typeof currentProps[rule] && !isEqual(currentProps[rule], nextProps[rule])) {
            return true;
        }
    }
    return false;
}
;
;
;
class Control extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { touched: false };
        this.onChange = this.onChange.bind(this);
        this.markAsTouched = this.markAsTouched.bind(this);
        this.markAsUntouched = this.markAsUntouched.bind(this);
    }
    get value() { return this.context.form.getValue(this.props.name) || this.props.defaultValue; }
    get form() { return this.context.form; }
    get status() { return this.context.form.getStatus(this.props.name); }
    get errors() { return this.context.form.getErrors(this.props.name); }
    get isValid() { return type_1.Status.VALID === this.status; }
    get isInvalid() { return !this.isValid; }
    get isTouched() { return this.state.touched; }
    get isUntouched() { return !this.isTouched; }
    UNSAFE_componentWillMount() {
        this.context.form.addControl(this.props.name, this);
    }
    UNSAFE_componentDidUpdate(prevProps) {
        if (isValidationRulesChanged(prevProps, this.props)) {
            this.context.form.validateControl(this.props.name);
        }
    }
    UNSAFE_componentWillUnmount() {
        this.context.form.removeControl(this.props.name);
    }
    onChange(value) {
        this.context.form.setValue(this.props.name, value);
    }
    markAsTouched() { !this.state.touched && this.setState({ touched: true }); }
    markAsUntouched() { this.state.touched && this.setState({ touched: false }); }
    runValidation(value) {
        return Object
            .keys(this.props)
            .filter(validators_1.default.has)
            .reduce((errors, v) => {
            const error = validators_1.default.get(v)(value, this.props[v], this);
            if (null !== error) {
                Object.assign(errors, error);
            }
            return errors;
        }, {});
    }
    render() {
        return this.props.children(this);
    }
}
Control.contextTypes = {
    form: PropTypes.object.isRequired
};
Control.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    defaultValue: PropTypes.any,
};
Control.defaultProps = {
    defaultValue: ''
};
exports.default = Control;
//# sourceMappingURL=control.js.map