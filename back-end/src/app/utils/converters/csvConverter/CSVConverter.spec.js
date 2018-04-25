const { CSVConverter } = require('./CSVConverter');
const { FileReader } = require('../../readers/fileReader/FileReader');

describe('CSVConverter', () => {
  let test = {};

  before(async () => {
    test = {};
    // Reading in before hook to not affect time of IO within test-case
    test.csvShortValid = (await new FileReader('test/assets/shortValid.csv').read()).toString();
    test.csvShortInvalid = (await new FileReader('test/assets/shortInvalid.csv').read()).toString();
  });

  after(() => {
    test = null;
  });

  it('should convert CSV format data to JSON', async () => {
    // given
    const fileReaderStub = {
      read: () => test.csvShortValid
    };
    const converter = new CSVConverter(fileReaderStub);

    // when
    const result = await converter.toJSON();

    // then
    assert.deepEqual(result, [
      {
        Quarter: '1',
        Month: '2012-02-01T00:00:00',
        Complaints: '5',
        UnitsSold: '86720'
      },
      {
        Quarter: '1',
        Month: '2012-03-01T00:00:00',
        Complaints: '10',
        UnitsSold: '824680'
      }
    ]);
  });

  it('should fail when CSV format data is not correct', async () => {
    // given
    const fileReaderStub = {
      read: () => test.csvShortInvalid
    };
    const converter = new CSVConverter(fileReaderStub);

    try {
      // when
      await converter.toJSON();
      throw new Error('Test should fail');
    } catch (err) {
      // then
      assert.strictEqual(err.message, 'CSVConverter has failed: ["column_mismatched",0,null]');
    }
  });
});
