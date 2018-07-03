const _ = require('lodash');
const { assert } = require('chai');
const { fillMapOfCMPUWithMissingMonths } = require('./cmpu-map-filler');

const { MONTH, CMPU, NO_VALUE } = require('../consts/names');

describe('#fillMapOfCMPUWithMissingMonths', () => {

    let suite;

    beforeEach(() => {
        suite = {};
        suite.month0 = {
            [MONTH]: 0,
            [CMPU]: 1
        };
        suite.month1 = {
            [MONTH]: 2678400000,
            [CMPU]: 2
        };
        suite.month5 = {
            [MONTH]: 13046400000,
            [CMPU]: 3
        };

    });

    afterEach(() => {
        suite = null;
    });

    it('should leave map as it is where there is only one object', () => {
        const cmpuMap = [suite.month0];
        const expectedResult = [suite.month0];

        const actualResult = fillMapOfCMPUWithMissingMonths(cmpuMap);

        assert.deepEqual(actualResult, expectedResult);
    });

    it('should not modify input', () => {
        const cmpuMap = [suite.month0];
        const expectedResult = _.cloneDeep(suite.month0);

        fillMapOfCMPUWithMissingMonths(cmpuMap);

        assert.deepEqual(suite.month0, expectedResult);
    });

    it('should leave map as it is where there is no distance between both dates', () => {
        const cmpuMap = [suite.month0, suite.month1];
        const expectedResult = [suite.month0, suite.month1];

        const actualResult = fillMapOfCMPUWithMissingMonths(cmpuMap);

        assert.deepEqual(actualResult, expectedResult);
    });

    it('should add missing months to map', () => {
        const cmpuMap = [suite.month0, suite.month1, suite.month5];
        const month2 = {
            [MONTH]: 5097600000,
            [CMPU]: NO_VALUE
        };
        const month3 = {
            [MONTH]: 7776000000,
            [CMPU]: NO_VALUE
        };
        const month4 = {
            [MONTH]: 10368000000,
            [CMPU]: NO_VALUE
        };
        const expectedResult = [suite.month0, suite.month1, month2, month3, month4, suite.month5];

        const actualResult = fillMapOfCMPUWithMissingMonths(cmpuMap);

        assert.deepEqual(actualResult, expectedResult);
    });

});