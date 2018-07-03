const calculateCMPU = require('./calculateCMPU');
const { mapForCMPU } = require('./mapDataForCMPU');

module.exports = {
    calculateMapWithCMPU: (parsedDate) => mapForCMPU(parsedDate, calculateCMPU)
}
