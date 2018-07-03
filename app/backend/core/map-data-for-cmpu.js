const _ = require('lodash');

const { MONTH, CMPU, COMPLAINTS, UNITS_SOLD } = require('../consts/names');

module.exports = {
    mapForCMPU
};

function mapForCMPU(parsedData, calculationMethod) {
    return _.map(parsedData, (chunk) => {
        const calculatedResult = calculationMethod(chunk[COMPLAINTS], chunk[UNITS_SOLD]);

        return {
            [MONTH]: chunk[MONTH],
            [CMPU]: calculatedResult
        };
    });
}