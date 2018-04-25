const { IndexRoute } = require('./index.route');
const { DataCpmuRoute } = require('./data/cpmu.route');

class RoutesManager {
  constructor(app, config) {
    this.app = app;
    this.config = config;
  }

  registerAll() {
    this.app.use('/', new IndexRoute().router);
    this.app.use('/data/cpmu', new DataCpmuRoute(this.config).router);
  }
}

module.exports = {
  RoutesManager
};
