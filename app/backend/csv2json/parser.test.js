const add = require('./parser').add;
const assert = require('chai').assert;

describe('#parser', () => {
    it('should add', () => {
        const a = 1;
        const b = 2;

        const addResult = add(a,b);
        assert.equal(3, addResult);
    })
})