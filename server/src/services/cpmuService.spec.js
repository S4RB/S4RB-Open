/* global it, describe, assert */

import moment from 'moment';
import {
  getMissingItems,
  calculateCpmu,
  aggregateByQuarter,
} from './cpmuService';

describe('CPMU service', () => {
  describe('getMissingItems', () => {
    it('should return missing months', () => {
      const currentMonth = '2012-01-01T00:00:00';
      const nextMonth = '2012-04-01T00:00:00';
      const current = { month: currentMonth };
      const next = { month: nextMonth };

      const result = getMissingItems(current, next);

      assert.equal(result.length, 2);
      assert.deepEqual(result, [{
        month: moment(currentMonth).add(1, 'M').valueOf(),
        quarter: 1,
      }, {
        month: moment(currentMonth).add(2, 'M').valueOf(),
        quarter: 1,
      }]);
    });
  });

  describe('calculateCpmu', () => {
    it('should calculate CPMU', () => {
      const complaints = 8767;
      const units = 657864353;

      const cpmu = calculateCpmu(complaints, units);

      assert.isTrue(Math.abs(cpmu - 13.3264554616) < 0.0001);
    });
  });

  describe('aggregateByQuarter', () => {
    it('should aggregate CPMU data bu quarters', () => {
      const cpmuResults = [2.95329485838, 40.4537922311, 82.3189824328];
      const cpmuData = [{
        month: moment('2012-01-01T00:00:00').valueOf(),
        quarter: 1,
        complaints: 2131,
        unitsSold: 876578912,
      }, {
        month: moment('2012-02-01T00:00:00').valueOf(),
        quarter: 1,
        complaints: 651,
        unitsSold: 65419816,
      }, {
        month: moment('2012-05-01T00:00:00').valueOf(),
        quarter: 2,
        complaints: 513,
        unitsSold: 6521541,
      }, {
        month: moment('2012-06-01T00:00:00').valueOf(),
        quarter: 2,
        complaints: 155,
        unitsSold: 9991126,
      }, {
        month: moment('2012-08-01T00:00:00').valueOf(),
        quarter: 3,
        complaints: 6519,
        unitsSold: 79191941,
      }];

      const result = aggregateByQuarter(cpmuData);

      result.forEach((item, index) => {
        assert.equal(item.quarter, 1);
        assert.equal(item.year, 2012);
        assert.isTrue(Math.abs(item.cpmu - cpmuResults[index]) < 0.0001);
      });
    });
  });
});
