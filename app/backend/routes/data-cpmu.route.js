const parse = require('../csv2json/parser');
const parsingSchema = require('../consts/types-schema');
const promisifiedReadFile = require('../utils/promisified-read-file');
const calculationService = require('../core/calculations.service');

module.exports = {
    sendParsedData,
    sendCalculatedCMPUData,
    sendDataCMPUWithFilledMissingMonths
};

function sendParsedData(req, res) {
    return readFileAndParse()
        .then((parsedData) => res.json(parsedData))
        .catch(() => res.status(404));
}

function sendCalculatedCMPUData(req, res) {
    return getParsedDataAndCalculate()
        .then((calculatedMapWithCMPU) => res.json(calculatedMapWithCMPU))
        .catch(() => res.status(404));
}

function sendDataCMPUWithFilledMissingMonths(req, res) {
    let filter;
    if(req.query.agregate === 'quarter') filter = (a) => a;
    else if (req.query.agregate === 'year') filter = (a) => a;
    else filter = calculationService.fillMissingMonths;

    return getParsedDataAndCalculate()
        .then(filter)
        .then((calculatedMapWithCMPU) => res.json(calculatedMapWithCMPU))
        .catch(() => res.status(404));
}

function getParsedDataAndCalculate() {
    return readFileAndParse()
        .then(calculationService.calculateMapWithCMPU);
}

function readFileAndParse() {
    return promisifiedReadFile('../data/cpmu.csv')
        .then((data) => parse(data.toString(), {types: parsingSchema}));
}