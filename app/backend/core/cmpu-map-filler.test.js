const _ = require('lodash');
const { assert } = require('chai');
const { fillMapOfCMPUWithMissingData } = require('./cmpu-map-filler');

const { MONTH, CMPU, NO_VALUE, QUARTER, YEAR } = require('../consts/names');

describe('#fillMapOfCMPUWithMissingData', () => {

    let suite;

    beforeEach(() => {
        suite = {};
        suite.month0 = {
            [MONTH]: 0,
            [QUARTER]: 1,
            [CMPU]: 1
        };
        suite.month1 = {
            [MONTH]: 2678400000,
            [QUARTER]: 1,
            [CMPU]: 2
        };
        suite.month5 = {
            [MONTH]: 13046400000,
            [QUARTER]: 2,
            [CMPU]: 3
        };

    });

    afterEach(() => {
        suite = null;
    });

    it('should leave map as it is where there is only one object', () => {
        const cmpuMap = [suite.month0];
        const expectedResult = [suite.month0];

        const actualResult = fillMapOfCMPUWithMissingData(cmpuMap);

        assert.deepEqual(actualResult, expectedResult);
    });

    it('should addy year even if there is only one object', () => {
        const cmpuMap = [suite.month0];
        const expectedResult = _.cloneDeep(suite.month0);
        expectedResult[YEAR] = 1970;

        fillMapOfCMPUWithMissingData(cmpuMap);

        assert.deepEqual(suite.month0, expectedResult);
    });

    it('should leave map as it is where there is no distance between both dates', () => {
        const cmpuMap = [suite.month0, suite.month1];
        const expectedResult = [suite.month0, suite.month1];

        const actualResult = fillMapOfCMPUWithMissingData(cmpuMap);

        assert.deepEqual(actualResult, expectedResult);
    });

    it('should add missing months to map', () => {
        const cmpuMap = [suite.month0, suite.month1, suite.month5];
        const month2 = {
            [MONTH]: 5097600000,
            [QUARTER]: 1,
            [YEAR]: 1970,
            [CMPU]: NO_VALUE
        };
        const month3 = {
            [MONTH]: 7776000000,
            [QUARTER]: 2,
            [YEAR]: 1970,
            [CMPU]: NO_VALUE
        };
        const month4 = {
            [MONTH]: 10368000000,
            [QUARTER]: 2,
            [YEAR]: 1970,
            [CMPU]: NO_VALUE
        };
        const expectedResult = [suite.month0, suite.month1, month2, month3, month4, suite.month5];

        const actualResult = fillMapOfCMPUWithMissingData(cmpuMap);

        assert.deepEqual(actualResult, expectedResult);
    });

});