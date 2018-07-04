const parse = require('../csv2json/parser');
const parsingSchema = require('../consts/types-schema');
const promisifiedReadFile = require('../utils/promisified-read-file');

module.exports = {
    readFileAndParse
};

function readFileAndParse() {
    return promisifiedReadFile('../data/cpmu.csv')
        .then((data) => parse(data.toString(), {types: parsingSchema}));
}
