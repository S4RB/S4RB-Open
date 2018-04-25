const Promise = require('bluebird');
const fs = require('fs');

class FileReader {
  constructor(filePath) {
    this.filePath = filePath;
    this.readFileAsync = Promise.promisify(fs.readFile);
  }

  async read() {
    try {
      return this.readFileAsync(this.filePath);
    } catch (err) {
      throw FileReader.createError(err.toString());
    }
  }

  static createError(message) {
    return new Error(`FileReader has failed: ${message}`);
  }
}

module.exports = {
  FileReader
};
