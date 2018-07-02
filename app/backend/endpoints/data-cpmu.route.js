const fs = require('fs');
const parser = require('../csv2json/parser').parse;

module.exports = function(req, res) {
    fs.readFile('../data/cpmu.csv', (err, data) => {
        if (err)
            return res.status(404);
        res.json(parser(data.toString()));
    });
};