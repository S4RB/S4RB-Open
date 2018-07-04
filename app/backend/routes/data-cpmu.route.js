const dataService = require('../core/data.service');
const calculationService = require('../core/calculations.service');

module.exports = {
    sendDataCMPUWithFilledMissingMonths
};

function sendDataCMPUWithFilledMissingMonths(req, res) {
    return dataService.readFileAndParse()
        .then(calculationService.calculateMapWithCMPU)
        .then(calculationService.fillMissingData)
        .then(calculationService.applyAgregations(req.query.agregate))
        .then((calculatedMapWithCMPU) => res.json(calculatedMapWithCMPU))
        .catch(() => res.status(404));
}
