'use strict';

const isObject = (v) => v && typeof v === 'object';

const isString = (v) => typeof v === 'string';

const foldFuns = (fns) => {
    // TODO check
    return (...args) => {
        let ret = [];
        for (let i = 0, n = fns.length; i < n; i++) {
            ret.push(fns[i](...args));
        }
        return ret;
    };
};

const isFunction = (v) => typeof v === 'function';

module.exports = {
    isObject,
    foldFuns,
    isString,
    isFunction
};
