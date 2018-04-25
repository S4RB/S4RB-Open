const express = require('express');
const logger = require('morgan');

const { RoutesManager } = require('./routes/routes');

function run(config) {
  const app = express();
  new RoutesManager(app, config).registerAll();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.static(config.publicDir));

  app.use((req, res) => {
    res.redirect('/');
  });

  app.listen(config.port, () => {
    // TODO: Should be replaced with a common logger
    console.log(`Listening on ${config.port}!`); // eslint-disable-line no-console
  });
}

module.exports = {
  run
};
