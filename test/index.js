'use strict';

const {
    onSignalType,
    Signal
} = require('..');

const assert = require('assert');

describe('index', () => {
    it('base', () => {
        let fn = onSignalType('s1', () => 10);
        assert.equal(fn(Signal('s1')), 10);
        assert.equal(fn(Signal('s2')), undefined);
    });
});
