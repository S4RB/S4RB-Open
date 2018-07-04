import _ from 'lodash';
import moment from 'moment';
import convertCsvFileToJson from '../utils/csvToJsonConverter';
import { csvDataFilePath } from '../config';
import { MILLION } from '../utils/constants';

const getMissingItems = (currentMonthData, nextMonthData) => {
  const missingMonths = [];
  const currentMonth = moment(currentMonthData.month).add(1, 'M');
  const nextMonth = moment(nextMonthData.month);
  while (currentMonth.isBefore(nextMonth)) {
    missingMonths.push({
      quarter: currentMonth.quarter(),
      month: currentMonth.valueOf(),
    });
    currentMonth.add(1, 'M');
  }

  return missingMonths;
};

const isDataMissing = (currentMonthData, nextMonthData) => {
  if (!nextMonthData) {
    return false;
  }

  return moment(currentMonthData.month)
    .add(1, 'M')
    .isBefore(moment(nextMonthData.month));
};

const fillMissingMonths = cpmuData => _
  .chain(cpmuData)
  .transform((acc, item, index) => {
    acc.push(item);
    if (isDataMissing(item, cpmuData[index + 1])) {
      acc.push(getMissingItems(item, cpmuData[index + 1]));
    }
  }, [])
  .flatten()
  .value();

const calculateCpmu = (complaints, unitsSold) => complaints / unitsSold * MILLION;

const calculateCpmuForALl = rawCpmuData => rawCpmuData
  .map(monthData => ({
    quarter: Number(monthData.Quarter),
    month: moment.utc(monthData.Month).valueOf(),
    complaints: Number(monthData.Complaints),
    unitsSold: Number(monthData.UnitsSold),
    cpmu: calculateCpmu(monthData.Complaints, monthData.UnitsSold),
  }));

const getCpmuData = () => convertCsvFileToJson(csvDataFilePath)
  .then(cpmuData => _.sortBy(cpmuData, item => item.Month))
  .then(calculateCpmuForALl)
  .then(fillMissingMonths);

export const getCpmuDataByMonth = () => getCpmuData()
  .then(cpmuData => cpmuData.map(i => ({ month: i.month, cpmu: i.cpmu })));

const aggregateByQuarter = cpmuData => _
  .chain(cpmuData)
  .filter(item => item.cpmu)
  .groupBy(item => `${moment(item.month).year()}-${item.quarter}`)
  .map((group) => {
    const complaints = _.sumBy(group, i => i.complaints);
    const unitsSold = _.sumBy(group, i => i.unitsSold);
    return {
      year: moment(group[0].month).year(),
      quarter: group[0].quarter,
      cpmu: calculateCpmu(complaints, unitsSold),
    };
  })
  .value();

export const getCpmuDataByQuarter = () => getCpmuData()
  .then(cpmuData => aggregateByQuarter(cpmuData));
