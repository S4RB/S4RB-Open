const express = require('express');
const _ = require('lodash');
const { FileReader } = require('../../utils/readers/fileReader/FileReader');
const { CSVConverter } = require('../../utils/converters/csvConverter/CSVConverter');
const {
  groupByYear, groupByMonth, calculateCpmu, normalizeRow, fillMissingMonths
} = require('../../utils/filters/cpmu.filter');

const DATA_CONVERSION_ERROR = 'Data conversion has failed';

class DataCpmuRoute {
  constructor(config) {
    this.router = express.Router();

    this.router.get('/', async (req, res) => {
      try {
        const fileReader = new FileReader(config.cpmuFilePath);
        const csvConverter = new CSVConverter(fileReader);
        const records = await csvConverter.toJSON(normalizeRow);
        const result = DataCpmuRoute.groupBy(req.query.groupBy)(records);

        res.json(result);
      } catch (err) {
        // TODO: Should be replaced with a common logger
        console.error(`${DATA_CONVERSION_ERROR}: ${err.toString()}`); // eslint-disable-line no-console
        res.status(500).json({
          error: DATA_CONVERSION_ERROR
        });
      }
    });
  }

  static groupBy(groupType) {
    let groupChain;

    switch (groupType) {
      case 'year':
        groupChain = [groupByYear, calculateCpmu];
        break;
      case 'month':
        groupChain = [groupByMonth, calculateCpmu, fillMissingMonths];
        break;
      default:
        groupChain = [_.identity];
    }

    return records => _.reduce(groupChain, (acc, curr) => curr(acc), records);
  }
}

module.exports = {
  DataCpmuRoute
};
