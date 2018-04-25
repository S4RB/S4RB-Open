const csv = require('csvtojson');
const _ = require('lodash');

class CSVConverter {
  constructor(fileReader) {
    this.fileReader = fileReader;
  }

  async toJSON(normalizeFunc = _.identity) {
    const fileContent = (await this.fileReader.read()).toString();

    return new Promise((resolve, reject) => {
      const result = [];
      const csvOpts = {
        checkColumn: true
      };

      // The library already supports file reader by itself, it is only to demonstrate the concept
      csv(csvOpts)
        .fromString(fileContent)
        .on('json', (json) => {
          result.push(normalizeFunc(json));
        })
        .on('done', () => {
          resolve(result);
        })
        .on('error', (err) => {
          reject(CSVConverter.createError(err.toString()));
        });
    });
  }

  static createError(message) {
    return new Error(`CSVConverter has failed: ${message}`);
  }
}

module.exports = {
  CSVConverter
};
