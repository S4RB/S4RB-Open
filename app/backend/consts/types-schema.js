const { QUARTER, MONTH, COMPLAINTS, UNITS_SOLD } = require('./names');

module.exports = {
  [QUARTER]: Number,
  [MONTH]: Date.parse,
  [COMPLAINTS]: Number,
  [UNITS_SOLD]: Number,
};
