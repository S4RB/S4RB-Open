const sinon = require('sinon');
const { assert } = require('chai');
const { mapForCMPU } = require('./map-data-for-cmpu');
const { MONTH, CMPU, COMPLAINTS, UNITS_SOLD } = require('../consts/names');

describe('#mapForCMPU', () => {

    let suite;

    beforeEach(() => {
        suite = {};
        suite.sandbox = sinon.createSandbox();
        suite.calculationMethod = suite.sandbox.fake.returns(1);
        suite.simpleComplaintsObject = {};
        suite.simpleUnitsSoldObject = {};
        const row1 = {
            [MONTH]: 1,
            [COMPLAINTS]: suite.simpleComplaintsObject,
            [UNITS_SOLD]: suite.simpleUnitsSoldObject
        };
        const row2 = {
            [MONTH]: 2,
            [COMPLAINTS]: suite.simpleComplaintsObject,
            [UNITS_SOLD]: suite.simpleUnitsSoldObject
        };
        suite.testData = [row1, row2];
    });

    afterEach(() => {
        suite.sandbox.restore();
        suite = null;
    });

    it('should map over array with filled 2 rows ', () => {
        const expectedResult = [
            {
                [MONTH]: 1,
                [COMPLAINTS]: suite.simpleComplaintsObject,
                [CMPU]: 1,
                [UNITS_SOLD]: suite.simpleUnitsSoldObject
            },{
                [MONTH]: 2,
                [COMPLAINTS]: suite.simpleComplaintsObject,
                [CMPU]: 1,
                [UNITS_SOLD]: suite.simpleUnitsSoldObject
            }
        ];

        const actualResult = mapForCMPU(suite.testData, suite.calculationMethod);

        assert.deepEqual(actualResult, expectedResult);
    });

    it('should map over array with filled 0 rows ', () => {
        const expectedResult = [];

        const actualResult = mapForCMPU([], suite.calculationMethod);

        assert.deepEqual(actualResult, expectedResult);
    });

    it('should not call calculation method', () => {
        mapForCMPU([], suite.calculationMethod);

        sinon.assert.notCalled(suite.calculationMethod);
    });

    it('should call calculation method twice with complains and units sold', () => {
        mapForCMPU(suite.testData, suite.calculationMethod);

        sinon.assert.calledTwice(suite.calculationMethod);
        sinon.assert.calledWith(suite.calculationMethod, suite.simpleComplaintsObject, suite.simpleUnitsSoldObject);
    });

});