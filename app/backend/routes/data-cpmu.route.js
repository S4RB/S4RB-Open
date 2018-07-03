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
        .then((parsed) => res.json(parsed))
        .catch(() => res.status(404));
}

function calculateData(req, res) {
    return readFileAndParse()
        .then(calculationService.calculateMapWithCMPU)
        .then((calculated) => res.json(calculated))
        .catch(() => res.status(404));
}

function readFileAndParse() {
    return promisifiedReadFile('../data/cpmu.csv')
        .then((data) => parse(data.toString(), {types: parsingSchema}));
}