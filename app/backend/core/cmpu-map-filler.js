const _ = require('lodash');

const { MONTH, CMPU, NO_VALUE, QUARTER, YEAR } = require('../consts/names');

module.exports = {
    fillMapOfCMPUWithMissingData
};

/**
 * Fills up gaps in months, quarters and years for data standardisation,
 * this solution assmues that array is pre sorted and dates are always round to 0.
 * @function
 * @param {array} calculatedMapWithCMPU - Map of CMPUs.
 */

function fillMapOfCMPUWithMissingData(calculatedMapWithCMPU) {
    return _.transform(calculatedMapWithCMPU, (accumulator, element, index, iterable) => {
        const elementDate = new Date(element[MONTH]);
        element[YEAR] = elementDate.getFullYear();
        accumulator.push(element);

        const nextElement = iterable[index + 1];
        if(_.isEmpty(nextElement)) return;

        const nextElementDate = new Date(nextElement[MONTH]);

        elementDate.setMonth(elementDate.getMonth() + 1);

        while (elementDate.getTime() < nextElementDate.getTime()) {
            accumulator.push({
                [MONTH]: Date.parse(elementDate),
                [QUARTER]: Math.ceil((elementDate.getMonth() + 1) / 3),
                [YEAR]: elementDate.getFullYear(),
                [CMPU]: NO_VALUE
            });

            elementDate.setMonth(elementDate.getMonth() + 1);
        };

    }, []);
}
