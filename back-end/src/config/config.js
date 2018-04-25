const path = require('path');

module.exports = {
  port: 5000,
  publicDir: path.join(__dirname, '..', 'public'),
  cpmuFilePath: path.join(__dirname, '..', 'app/database/csvFiles/cpmu.csv')
};
