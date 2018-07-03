const { calculateCMPU } = require('./calculate-cmpu');
const { mapForCMPU } = require('./map-data-for-cmpu');
const { fillMapOfCMPUWithMissingMonths } = require('./cmpu-map-filler');

module.exports = {
    calculateMapWithCMPU,
    fillMissingMonths
};

function calculateMapWithCMPU(parsedData) {
    return mapForCMPU(parsedData, calculateCMPU);
}

function fillMissingMonths(calculatedMapWithCMPU) {
    return fillMapOfCMPUWithMissingMonths(calculatedMapWithCMPU);
}
