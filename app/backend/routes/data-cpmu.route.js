const parse = require('../csv2json/parser');
const parsingSchema = require('../consts/types-schema');
const promisifiedReadFile = require('../utils/promisified-read-file');
const calculationService = require('../core/calculations.service');

module.exports = {
    getData,
    calculateData
};

function getData(req, res) {
    return readFileAndParse()
        .then((parsedData) => res.json(parsedData))
        .catch(() => res.status(404));
}

function calculateData(req, res) {
    return readFileAndParse()
        .then(calculationService.calculateMapWithCMPU)
        .then((calculatedMapWithCMPU) => res.json(calculatedMapWithCMPU))
        .catch(() => res.status(404));
}

function readFileAndParse() {
    return promisifiedReadFile('../data/cpmu.csv')
        .then((data) => parse(data.toString(), {types: parsingSchema}));
}