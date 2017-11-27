'use strict';

/**
 * signal system protocol
 */

const {
    foldFuns,
    isString,
    isObject,
    isFunction
} = require('./util');

/**
 * signal:
 * {
 *   type,
 *   data,
 *   extra
 * }
 *
 * type := [0-9a-zA-Z\-\_]+
 *
 * TODO type grammer check
 */
const Signal = (type, data, extra) => {
    return {
        type,
        data,
        extra
    };
};

const isSignalType = (s, type) => {
    return s.type === type;
};

/**
 * handle specific type of signal.
 *
 * TODO a simple grammer to compose signal type
 */
const onSignalType = (expectType, fn) => {
    if (!isString(expectType)) {
        throw new TypeError(`Expect string, but got ${expectType}`);
    }
    if (!isFunction(fn)) {
        throw new TypeError(`Expect function, but got ${fn}`);
    }

    return (signal, ...rest) => {
        if (isSignalType(signal, expectType)) {
            return fn(signal, ...rest);
        }
    };
};

/**
 * pass signal directly
 *
 * TODO delivery chain
 */
const deliver = (ctx, type, extra) => (sourceSignal, sourceData, sourceCtx) => {
    return ctx.notify(Signal(type, sourceSignal.data, {
        sourceType: 'delivered',
        sourceSignal,
        sourceData,
        sourceCtx,
        extra
    }));
};

/**
 * pass signal
 */
const pass = (ctx, fromSignalType = '', toSignalType) => {
    let map = {};

    if (isString(fromSignalType)) {
        map[fromSignalType] = toSignalType;
    } else if (isObject(fromSignalType)) {
        map = fromSignalType;
    }

    let list = [];
    for (let from in map) {
        let next = map[from] ? map[from] : from;
        list.push(onSignalType(from, deliver(ctx, next)));
    }

    return foldFuns(list);
};

module.exports = {
    Signal,
    onSignalType,
    isSignalType,
    deliver,
    pass
};
