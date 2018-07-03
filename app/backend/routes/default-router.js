const endpointsRoute = require('express').Router();

endpointsRoute.get('/data/cpmu', require('./data-cpmu.route').getData);
endpointsRoute.get('/data/cpmu:calculate', require('./data-cpmu.route').calculateData);

module.exports = endpointsRoute;
