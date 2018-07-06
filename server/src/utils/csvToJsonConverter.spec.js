/* global it, describe, assert */

import convertToJson from './csvToJsonConverter';

describe('csvToJson converter', () => {
  it('should convert CSV to JSON', (done) => {
    convertToJson('./test/assets/sample.csv').then((json) => {
      assert.deepEqual(json, [
        {
          Quarter: '1',
          Month: '2012-01-01T00:00:00',
          Complaints: '27',
          UnitsSold: '4932508',
        },
        {
          Quarter: '1',
          Month: '2012-02-01T00:00:00',
          Complaints: '5',
          UnitsSold: '86720',
        },
      ]);
      done();
    });
  });
});
