const parse = require('./parser');
const assert = require('chai').assert;

describe('#parser', () => {

    let suite;

    beforeEach(() => {
        suite = {};
        suite.testData = `"h1","h2","h3"\n"data1","data2","data3"\n"data4","data5","data6"`;
    });

    afterEach(() => {
        suite = null;
    });

    it('should add', () => {
        const expectedResult = [
            {"h1":"data1","h2":"data2","h3":"data3"},
            {"h1":"data4","h2":"data5","h3":"data6"}
        ];

        const actualResult = parse(suite.testData);
        
        assert.deepEqual(expectedResult, actualResult);
    })
})