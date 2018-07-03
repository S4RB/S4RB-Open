const _ = require('lodash');
const { calculateCMPU } = require('./calculate-cmpu');
const { mapForCMPU } = require('./map-data-for-cmpu');
const { fillMapOfCMPUWithMissingMonths } = require('./cmpu-map-filler');
const { MONTH, CMPU } = require('../consts/names');

module.exports = {
    calculateMapWithCMPU,
    fillMissingMonths
};

function calculateMapWithCMPU(parsedData) {
    return mapForCMPU(parsedData, calculateCMPU);
}

function fillMissingMonths(calculatedMapWithCMPU) {
    return _.map(fillMapOfCMPUWithMissingMonths(calculatedMapWithCMPU), (value) => _.pick(value, [MONTH, CMPU]));
}
