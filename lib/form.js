"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PropTypes = require("prop-types");
const type_1 = require("./type");
const utils_1 = require("./utils");
;
;
class Form extends react_1.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            controls: new Map(),
            value: props.defaultValue,
            errors: {},
            status: {},
            submitted: false
        };
        this.update = this.update.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.mounted = true;
    }
    UNSAFE_componentWillUnmount() {
        this.mounted = false;
    }
    get status() {
        return Object
            .keys(this.state.status)
            .some(n => type_1.Status.VALID !== this.state.status[n])
            ? type_1.Status.INVALID : type_1.Status.VALID;
    }
    get errors() { return this.state.errors; }
    get isValid() { return type_1.Status.VALID === this.status; }
    get isInvalid() { return !this.isValid; }
    get isSubmitted() { return this.state.submitted; }
    getChildContext() {
        return { form: this };
    }
    addControl(name, control) {
        if (!this.mounted) {
            return;
        }
        let errors = {};
        let status = type_1.Status.INIT;
        if (Object.keys(this.state.value).indexOf(name) > -1) {
            errors = control.runValidation(this.getValue(name));
            status = utils_1.hasError(errors) ? type_1.Status.INVALID : type_1.Status.VALID;
        }
        this.setState(state => (Object.assign({}, state, { controls: new Map([...state.controls, [name, control]]), errors: Object.assign({}, state.errors, { [name]: errors }), status: Object.assign({}, state.status, { [name]: status }) })), this.update);
    }
    removeControl(name) {
        if (!this.mounted) {
            return;
        }
        this.setState(state => {
            const controls = new Map([...state.controls]);
            const errors = Object.assign({}, state.errors);
            const status = Object.assign({}, state.status);
            const value = Object.assign({}, state.value);
            controls.delete(name);
            delete errors[name];
            delete status[name];
            delete value[name];
            return Object.assign({}, state, { value, controls, errors, status });
        }, () => {
            this.onChange();
            this.update();
        });
    }
    getValue(name) {
        return this.state.value[name];
    }
    setValue(name, value) {
        this.setState(state => (Object.assign({}, state, { value: Object.assign({}, state.value, { [name]: value }) })), () => {
            this.onChange();
            this.validateControl(name);
        });
    }
    setErrors(name, errors) {
        const status = utils_1.hasError(errors) ? type_1.Status.INVALID : type_1.Status.VALID;
        this.setState(state => (Object.assign({}, state, { errors: Object.assign({}, state.errors, { [name]: errors }), status: Object.assign({}, state.status, { [name]: status }) })), this.update);
    }
    validateControl(name) {
        const control = this.state.controls.get(name);
        const errors = control.runValidation(this.getValue(name));
        this.setErrors(name, errors);
    }
    getStatus(name) {
        return this.state.status[name];
    }
    getErrors(name) {
        return this.state.errors[name] || {};
    }
    update() {
        this.state.controls.forEach(c => c.forceUpdate());
        this.forceUpdate();
    }
    submit() {
        const { status } = this.state;
        const needsToValidate = [];
        for (const name in status) {
            if (type_1.Status.INIT === status[name]) {
                needsToValidate.push(name);
            }
        }
        if (!needsToValidate.length) {
            this.handleSubmit();
            return;
        }
        this.setState(state => {
            const newState = Object.assign({}, state);
            for (const name of needsToValidate) {
                const control = this.state.controls.get(name);
                const errors = control.runValidation(this.getValue(name));
                const status = utils_1.hasError(errors) ? type_1.Status.INVALID : type_1.Status.VALID;
                newState.errors[name] = errors;
                newState.status[name] = status;
            }
            return newState;
        }, this.handleSubmit);
    }
    handleSubmit() {
        this.setState(state => (Object.assign({}, state, { submitted: true })), () => {
            if (this.isInvalid) {
                this.onInvalidSubmit();
                return;
            }
            this.onValidSubmit();
        });
    }
    onChange() {
        if ('function' === typeof this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    onInvalidSubmit() {
        if ('function' === typeof this.props.onInvalidSubmit) {
            this.props.onInvalidSubmit(this.state.errors, this.state.value);
        }
    }
    onValidSubmit() {
        if ('function' === typeof this.props.onValidSubmit) {
            this.props.onValidSubmit(this.state.value);
        }
    }
    render() {
        return this.props.children(this);
    }
}
Form.childContextTypes = {
    form: PropTypes.object
};
Form.propTypes = {
    children: PropTypes.func.isRequired,
    defaultValue: PropTypes.object,
    onValidSubmit: PropTypes.func,
    onInvalidSubmit: PropTypes.func,
};
Form.defaultProps = {
    defaultValue: {}
};
exports.default = Form;
//# sourceMappingURL=form.js.map