const endpointsRoute = require("express").Router();

endpointsRoute.get('/', require('./endpoints/index-web.route'));
endpointsRoute.get('/data/cpmu', require('./endpoints/data-cpmu.route'));

endpointsRoute.get('*', function(req, res) {
    res.redirect('/');
});

module.exports = endpointsRoute;