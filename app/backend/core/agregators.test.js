const _ = require('lodash');
const { assert } = require('chai');
const { agregateByQuarter, agregateByYear } = require('./agregators');

const { MONTH, CMPU, NO_VALUE, QUARTER, YEAR } = require('../consts/names');

describe('#agregateByQuarter', () => {
    let suite;

    beforeEach(() => {
        suite = {};
        suite.filledData = [
            { [MONTH]: 0, [QUARTER]: 1, [YEAR]: 1970, [CMPU]: 14.11 },
            { [MONTH]: 2678400000, [QUARTER]: 1, [YEAR]: 1970, [CMPU]: 33.11 },
            { [MONTH]: 5097600000, [QUARTER]: 1, [YEAR]: 1970, [CMPU]: 133.44 },
            { [MONTH]: 7776000000, [QUARTER]: 2, [YEAR]: 1970, [CMPU]: 702.11 },
            { [MONTH]: 10368000000, [QUARTER]: 2, [YEAR]: 1970, [CMPU]: 33.13 },
            { [MONTH]: 13046400000, [QUARTER]: 2, [YEAR]: 1970, [CMPU]: NO_VALUE },
            { [MONTH]: 15638400000, [QUARTER]: 3, [YEAR]: 1970, [CMPU]: NO_VALUE },
            { [MONTH]: 18316800000, [QUARTER]: 3, [YEAR]: 1970, [CMPU]: 1 },
            { [MONTH]: 20995200000, [QUARTER]: 3, [YEAR]: 1970, [CMPU]: 21.1 },
            { [MONTH]: 23587200000, [QUARTER]: 4, [YEAR]: 1970, [CMPU]: 0 },
            { [MONTH]: 26265600000, [QUARTER]: 4, [YEAR]: 1970, [CMPU]: 0 },
            { [MONTH]: 28857600000, [QUARTER]: 4, [YEAR]: 1970, [CMPU]: NO_VALUE },
            { [MONTH]: 31536000000, [QUARTER]: 1, [YEAR]: 1971, [CMPU]: NO_VALUE },
            { [MONTH]: 34214400000, [QUARTER]: 1, [YEAR]: 1971, [CMPU]: 11 },
            { [MONTH]: 36633600000, [QUARTER]: 1, [YEAR]: 1971, [CMPU]: 32.11 },
            { [MONTH]: 39312000000, [QUARTER]: 2, [YEAR]: 1971, [CMPU]: 45151 },
            { [MONTH]: 41904000000, [QUARTER]: 2, [YEAR]: 1971, [CMPU]: NO_VALUE },
            { [MONTH]: 44582400000, [QUARTER]: 2, [YEAR]: 1971, [CMPU]: 3 }
              
        ];

    });

    afterEach(() => {
        suite = null;
    });

    it('should properly calculate CMPU for quarters', () => {
        const expectedResult = [
            { [MONTH]: 0, [QUARTER]: 1, [YEAR]: 1970, [CMPU]: 60.22 },
            { [MONTH]: 7776000000, [QUARTER]: 2, [YEAR]: 1970, [CMPU]: 245.08 },
            { [MONTH]: 15638400000, [QUARTER]: 3, [YEAR]: 1970, [CMPU]: 7.36666667 },
            { [MONTH]: 23587200000, [QUARTER]: 4, [YEAR]: 1970, [CMPU]: 0 },
            { [MONTH]: 31536000000, [QUARTER]: 1, [YEAR]: 1971, [CMPU]: 14.37 },
            { [MONTH]: 39312000000, [QUARTER]: 2, [YEAR]: 1971, [CMPU]: 15051.33333333 }
        ];

        const actualResult = agregateByQuarter(suite.filledData);

        assert.deepEqual(actualResult, expectedResult)
    });

    it('should properly calculate CMPU for years', () => {
        const expectedResult = [
            { [MONTH]: 0, [QUARTER]: 1, [YEAR]: 1970, [CMPU]: 78.16666667 },
            { [MONTH]: 31536000000, [QUARTER]: 1, [YEAR]: 1971, [CMPU]: 7532.85166667 }
        ];

        const actualResult = agregateByYear(suite.filledData);

        assert.deepEqual(actualResult, expectedResult)
    });

    it('should calculate same result with same CMPU if year and quarter have the same range', () => {
        const preparedData = _.drop(suite.filledData, 16)
        const copyForSecondAgregation = _.cloneDeep(preparedData);

        const agregationByQuarter = agregateByQuarter(preparedData);
        const agregationByYear = agregateByQuarter(copyForSecondAgregation);

        assert.deepEqual(agregationByQuarter, agregationByYear);
    })
});