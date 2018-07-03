const _ = require('lodash');

module.exports = parse;

function parse(text) {
    if (!_.isString(text)) return;
    const lines = _.chain(text).replace(/"/g, '').split(/\n/).value();
    const headers = _.split(lines.shift(), ',');

    if (_.isEmpty(headers) || _.isEmpty(lines[0])) return [];

    return _.chain(lines)
            .split(',')
            .chunk(headers.length)
            .map(assignToHeaders)
            .value();

    function assignToHeaders(a) {
        return _.reduce(a, (result, value, key) => {
            result[headers[key]] = value;
            return result;
        }, {});
    }
}
