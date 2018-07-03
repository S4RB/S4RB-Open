const _ = require('lodash');
const MILLION = (10 ** 6);

module.exports = {
    calculateCMPU
};

function calculateCMPU(complaints, unitsSold) {
    if (complaints === 0 || unitsSold === 0) return 0;
    return _.round(((MILLION / unitsSold) * complaints), 8);
}
