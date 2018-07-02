const _ = require('lodash');

module.exports = {
    add: (a, b) => a+b,
    parse
}

function parse(text) {
    const lines = _.chain(text).replace(/"/g, '').split('\n').value();
    const headers = _.split(lines.shift(), ',');
    const obj = {};

    return _.chain(lines)
            .split(',')
            .chunk(headers.length)
            .map(assignToIndex)
            .value();

    function assignToIndex() {

    }
}
