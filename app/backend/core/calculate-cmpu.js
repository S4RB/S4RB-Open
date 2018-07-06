const _ = require('lodash');
const MILLION = (10 ** 6);

module.exports = {
    calculateCMPU,
    unifyCalculations
};

function calculateCMPU(complaints, unitsSold) {
    if (complaints === 0 || unitsSold === 0) return 0;
    return unifyCalculations(((MILLION / unitsSold) * complaints));
}

function unifyCalculations(calculation) {
    return _.round(calculation , 8);
}