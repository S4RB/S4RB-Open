const endpointsRoute = require('express').Router();

endpointsRoute.get('/data/cpmu', require('./data-cpmu.route').sendDataCMPUWithFilledMissingMonths);

module.exports = endpointsRoute;
