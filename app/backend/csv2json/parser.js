const _ = require('lodash');

module.exports = parse;

function parse(text, opt = {}) {
    if (!_.isString(text)) return;
    const lines = _.chain(text)
        .replace(/"/g, '')
        .split(/\r?\n|\r/)
        .tap((array) => _.remove(array, _.isEmpty))
        .value();

    const headers = _.split(lines.shift(), ',');

    if (_.isEmpty(headers) || _.isEmpty(lines)) return [];

    return _.chain(lines)
            .split(',')
            .chunk(headers.length)
            .map(_.isObject(opt.types) ? assignToHeadersWithTypes : assignToHeaders)
            .value();

    function assignToHeaders(arrayOfLines) {
        return _.reduce(arrayOfLines, (result, value, key) => {
            result[headers[key]] = value;
            return result;
        }, {});
    }

    function assignToHeadersWithTypes(arrayOfLines) {
        return _.reduce(arrayOfLines, (result, value, key) => {
            const header = headers[key];
            const headerType = opt.types[header];
            result[header] = _.isFunction(headerType) ? headerType(value) : value;
            return result;
        }, {});
    }
}
