const parse = require('../csv2json/parser');
const promisifiedReadFile = require('../utils/promisified-read-file');

module.exports = function(req, res) {
    promisifiedReadFile('../data/cpmu.csv')
        .then((data) => parse(data.toString()))
        .then((parsed) => res.json(parsed))
        .catch(() => res.status(404));
};