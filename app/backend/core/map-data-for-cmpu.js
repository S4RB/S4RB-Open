const _ = require('lodash');

const { CMPU, COMPLAINTS, UNITS_SOLD } = require('../consts/names');

module.exports = {
    mapForCMPU
};

function mapForCMPU(parsedData, calculationMethod) {
    return _.map(parsedData, (chunk) => {
        const calculatedResult = calculationMethod(chunk[COMPLAINTS], chunk[UNITS_SOLD]);
        chunk[CMPU] = calculatedResult
        return chunk;
    });
}