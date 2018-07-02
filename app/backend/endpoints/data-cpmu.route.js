const parse = require('../csv2json/parser');
const getFile = require('../utils/promisified-read-file');

module.exports = function(req, res) {
    getFile('../data/cpmu.csv')
        .then((data) => parse(data.toString()))
        .then((parsed) => res.json(parsed))
        .catch(() => res.status(404));
};