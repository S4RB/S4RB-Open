// To optymyze data processing, we could use async library as well
// to not block main thread with bigger collection
const _ = require('lodash');

function normalizeRow(record) {
  return {
    Quarter: Number(record.Quarter),
    Month: new Date(record.Month),
    Complaints: Number(record.Complaints),
    UnitsSold: Number(record.UnitsSold)
  };
}

function calculateCpmu(groups) {
  return _.map(groups, (group) => {
    const reducedComplaints = _.reduce(
      group,
      (acc, curr) => ((curr.Complaints) ? acc + curr.Complaints : -1), 0
    );

    return {
      Month: _.last(group).Month,
      Complaints: reducedComplaints
    };
  }, []);
}

function groupBy(records, comparatorFunc) {
  return _.transform(records, (acc, curr) => {
    const prevGroup = _.last(acc);

    if (_.isUndefined(prevGroup)) {
      acc.push([curr]);
    } else if (comparatorFunc(curr, _.last(prevGroup))) {
      prevGroup.push(curr);
    } else {
      acc.push([curr]);
    }
  }, []);
}

function groupByYear(records) {
  return groupBy(
    records,
    (curr, prev) => curr.Month.getFullYear() === prev.Month.getFullYear()
  );
}

function groupByMonth(records) {
  return groupBy(
    records,
    (curr, prev) => curr.Month.getMonth() === prev.Month.getMonth() &&
      curr.Month.getFullYear() === prev.Month.getFullYear()
  );
}

// Eventually could be optimized to reduce number of iterations
// if the scope of features would have be clearer
function fillMissingMonths(records) {
  const NUM_OF_MONTHS = 12;
  const groups = groupByYear(records);

  return _.chain(groups)
    .transform((acc, curr) => {
      const groupYear = _.last(curr).Month.getFullYear();
      const months = _.times(NUM_OF_MONTHS, (n) => {
        const date = new Date();
        date.setFullYear(groupYear);
        date.setMonth(n);

        return {
          Month: date
        };
      }, []);

      _.forEach(curr, (record) => {
        const foundMonth = months[record.Month.getMonth()];

        if (foundMonth) {
          months[record.Month.getMonth()] = record;
        }
      });

      acc.push(months);
    }, [])
    .flatten()
    .value();
}

module.exports = {
  groupBy,
  groupByYear,
  groupByMonth,
  calculateCpmu,
  normalizeRow,
  fillMissingMonths
};
