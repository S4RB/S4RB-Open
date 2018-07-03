import _ from 'lodash';
import moment from 'moment';
import convertCsvFileToJson from '../utils/csvToJsonConverter';
import { csvDataFilePath } from '../config';

class CpmuService {
  constructor() {
    this.filePath = csvDataFilePath;
  }

  getCpmuData() {
    return convertCsvFileToJson(this.filePath)
      .then(cpmuData => _.sortBy(cpmuData, item => item.Month))
      .then(CpmuService.calculateCpmu)
      .then(CpmuService.fillMissingMonths);
  }

  static calculateCpmu(rawCpmuData) {
    return rawCpmuData.map(monthData => ({
      quarter: monthData.Quarter,
      month: monthData.Month,
      complaints: monthData.Complaints,
      unitsSold: monthData.UnitsSold,
      cpmu: monthData.Complaints / monthData.UnitsSold * 1000000,
    }));
  }

  static fillMissingMonths(cpmuData) {
    return _
      .chain(cpmuData)
      .transform((acc, item, index) => {
        acc.push(item);
        if (CpmuService.isDataMissing(item, cpmuData[index + 1])) {
          acc.push(CpmuService.getMissingItems(item, cpmuData[index + 1]));
        }
      }, [])
      .flatten()
      .value();
  }

  static isDataMissing(currentMonthData, nextMonthData) {
    if (!nextMonthData) {
      return false;
    }

    return moment(currentMonthData.month)
      .add(1, 'M')
      .isBefore(moment(nextMonthData.month));
  }

  static getMissingItems(currentMonthData, nextMonthData) {
    const missingMonths = [];
    const currentMonth = moment(currentMonthData.month).add(1, 'M');
    const nextMonth = moment(nextMonthData.month);
    while (currentMonth.isBefore(nextMonth)) {
      missingMonths.push({
        quarter: currentMonth.quarter(),
        month: currentMonth.format('YYYY-MM-DDTHH:mm:ss'),
        complaints: 'No Value',
        unitsSold: 'No Value',
        cpmu: 'No Value',
      });
      currentMonth.add(1, 'M');
    }

    return missingMonths;
  }
}

export default new CpmuService();
