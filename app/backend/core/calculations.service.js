const _ = require('lodash');
const { calculateCMPU } = require('./calculate-cmpu');
const { mapForCMPU } = require('./map-data-for-cmpu');
const { fillMapOfCMPUWithMissingData } = require('./cmpu-map-filler');
const { agregateByQuarter, agregateByYear } = require('./agregators');
const { MONTH, CMPU, QUARTER, YEAR } = require('../consts/names');

module.exports = {
    calculateMapWithCMPU,
    fillMissingData,
    applyAgregations
};

function calculateMapWithCMPU(parsedData) {
    return mapForCMPU(parsedData, calculateCMPU);
}

function fillMissingData(calculatedMapWithCMPU) {
    return fillMapOfCMPUWithMissingData(calculatedMapWithCMPU);
}

function applyAgregations(agregateType) {
    if(agregateType === 'quarter')
        return (completeMap) => trimObjects(agregateByQuarter(completeMap), [YEAR, QUARTER, CMPU]);
    else if (agregateType === 'year')
        return (completeMap) => trimObjects(agregateByYear(completeMap), [YEAR, CMPU]);
    else
        return (completeMap) => trimObjects(completeMap, [MONTH, CMPU]);
}

function trimObjects(arrayOfObjects, arrayOfAlowedProperitesNames) {
    return _.map(arrayOfObjects, (value) => _.pick(value, arrayOfAlowedProperitesNames));
}