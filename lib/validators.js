"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators = new Map();
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const isEmpty = (val) => null === val || undefined === val;
validators.set('required', (val) => {
    if (isEmpty(val)) {
        return { required: true };
    }
    if ('string' === typeof val && '' === val.trim()) {
        return { required: true };
    }
    return null;
});
validators.set('minLength', (val, length) => {
    if (isEmpty(val)) {
        return null;
    }
    return `${val}`.length >= length ? null : { minLength: true };
});
validators.set('maxLength', (val, length) => {
    if (isEmpty(val)) {
        return null;
    }
    return `${val}`.length <= length ? null : { maxLength: true };
});
validators.set('pattern', (val, pattern) => {
    if (isEmpty(val)) {
        return null;
    }
    return pattern.test(val) ? null : { pattern: true };
});
validators.set('email', (val) => {
    if (isEmpty(val)) {
        return null;
    }
    return EMAIL_REGEXP.test(val) ? null : { email: true };
});
validators.set('equalToControl', (val, controlName, control) => {
    if (isEmpty(val)) {
        return null;
    }
    return val === control.form.getValue(controlName) ? null : { equalToControl: true };
});
validators.set('callback', (val, fn, control) => {
    if (isEmpty(val)) {
        return null;
    }
    return fn(val, control) ? null : { callback: true };
});
exports.default = {
    delete(v) { return validators.delete(v); },
    add(v, fn) { return validators.set(v, fn); },
    get(v) { return validators.get(v); },
    has(v) { return validators.has(v); },
};
//# sourceMappingURL=validators.js.map