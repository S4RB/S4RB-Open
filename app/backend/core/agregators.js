const _ = require('lodash');
const { unifyCalculations } = require('./calculate-cmpu')
const { QUARTER, CMPU, YEAR } = require('../consts/names');

module.exports = {
    agregateByQuarter,
    agregateByYear
};

function agregateByQuarter(arrayOfObjects) {
    return agregate(arrayOfObjects, checkForSameQuarterAndYear)
}

function agregateByYear(arrayOfObjects) {
    return agregate(arrayOfObjects, checkForSameYear)
}

function agregate(arrayOfObjects, predicate) {
    return _(arrayOfObjects)
        .transform((accumulator, element, index, iterable) => {
            const lastElement = iterable[index - 1];

            if (_.isObject(lastElement) && predicate(element, lastElement)) {

                const valueAgregator = _.last(accumulator);
                valueAgregator[CMPU].push(element[CMPU]);
                return;
            }
            const cmpuReminder = element[CMPU];
            element[CMPU] = [cmpuReminder];
            accumulator.push(element)
        }, [])
        .map((element) => {
            const divider = element[CMPU].length;
            const calculatedCMPUs = _.reduce(element[CMPU], (accumulator, value) => {
                return accumulator + ((_.isNumber(value)) ? value : 0);
            }, 0) / divider;
            element[CMPU] = unifyCalculations(calculatedCMPUs);
            return element;
        })
        .value();
}

function checkForSameQuarterAndYear(current, last) {
    return last[QUARTER] === current[QUARTER] && last[YEAR] === current[YEAR]
}

function checkForSameYear(current, last) {
    return last[YEAR] === current[YEAR]
}