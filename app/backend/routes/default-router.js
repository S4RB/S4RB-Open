const endpointsRoute = require('express').Router();

endpointsRoute.get('/data/cpmu', require('./data-cpmu.route').sendParsedData);
endpointsRoute.get('/data/cpmu/calculate', require('./data-cpmu.route').sendCalculatedCMPUData);
endpointsRoute.get('/data/cpmu/fill-gaps', require('./data-cpmu.route').sendDataCMPUWithFilledMissingMonths);

module.exports = endpointsRoute;
