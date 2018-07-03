const _ = require('lodash');

const { MONTH, CMPU, NO_VALUE } = require('../consts/names');

module.exports = {
    fillMapOfCMPUWithMissingMonths
};

/**
 * Fills up gaps in months of month/cmpu array,
 * this solution assmues that array is pre sorted and dates are always round to 0
 * @function
 * @param {array} calculatedMapWithCMPU - Map of CMPUs.
 */

function fillMapOfCMPUWithMissingMonths(calculatedMapWithCMPU) {
    return _.transform(calculatedMapWithCMPU, (accumulator, element, index, iterable) => {
        accumulator.push(element);

        const nextElement = iterable[index + 1];
        if(_.isEmpty(nextElement)) return;

        const elementDate = new Date(element[MONTH]);
        const nextElementDate = new Date(nextElement[MONTH]);

        while (elementDate.setMonth(elementDate.getMonth() + 1) < nextElementDate.getTime()) {
            accumulator.push({
                [MONTH]: Date.parse(elementDate),
                [CMPU]: NO_VALUE
            });
        };

    }, []);
}