const checkEngines = require('check-engines');
const app = require('./app/app');
const config = require('./config/config');

checkEngines((err) => {
  if (err) {
    process.stderr.write(err.toString());
    process.exit(1);
  }

  app.run(config);
});

