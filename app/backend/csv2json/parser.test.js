const { assert } = require('chai');
const { parse } = require('./parser');

describe('#parser', () => {

    let suite;

    beforeEach(() => {
        suite = {};
    });

    afterEach(() => {
        suite = null;
    });

    describe('should return proper value when', () => {

        it(`provided value isn't string value`, () => {
            suite.testData = {
                some: "object"
            };
    
            const actualResult = parse(suite.testData);
            
            assert.isUndefined(actualResult);
        });

        it('no data are provided', () => {
            suite.testData = '';
            const expectedResult = [];
    
            const actualResult = parse(suite.testData);

            assert.deepEqual(expectedResult, actualResult);
        });

        it('just enters are provided', () => {
            suite.testData = '\n\n';
            const expectedResult = [];
    
            const actualResult = parse(suite.testData);

            assert.deepEqual(expectedResult, actualResult);
        });

        it('no row of data is provided', () => {
            suite.testData = `"h1","h2","h3"`;
            const expectedResult = [];
    
            const actualResult = parse(suite.testData);
            
            assert.deepEqual(expectedResult, actualResult);
        });

        it('no row of data is provided with new line character', () => {
            suite.testData = `"h1","h2","h3"\n`;
            const expectedResult = [];
    
            const actualResult = parse(suite.testData);
            
            assert.deepEqual(expectedResult, actualResult);
        });

        it('one row of data is provided', () => {
            suite.testData = `"h1","h2","h3"\n"data1","data2","data3`;
            const expectedResult = [
                {"h1":"data1","h2":"data2","h3":"data3"}
            ];
    
            const actualResult = parse(suite.testData);
            
            assert.deepEqual(expectedResult, actualResult);
        });

        it('should omit enters', () => {
            suite.testData = `"h1","h2","h3"\n\n\n"data1","data2","data3"\n\n\n\n"data4","data5","data6"`;
            const expectedResult = [
                {"h1":"data1","h2":"data2","h3":"data3"},
                {"h1":"data4","h2":"data5","h3":"data6"}
            ];
    
            const actualResult = parse(suite.testData);
            
            assert.deepEqual(expectedResult, actualResult);
        });

        it('multiples rows of datas are provided', () => {
            suite.testData = `"h1","h2","h3"\n"data1","data2","data3"\n"data4","data5","data6"`;
            const expectedResult = [
                {"h1":"data1","h2":"data2","h3":"data3"},
                {"h1":"data4","h2":"data5","h3":"data6"}
            ];
    
            const actualResult = parse(suite.testData);
            
            assert.deepEqual(expectedResult, actualResult);
        });

        it('should return proper value with types', () => {
            suite.testData = `"h1","h2","h3"\n"data1","data2","data3"\n"data4","data5","data6"`;
            suite.testOpt = {
                types: {
                    h1: (a) => a + a,
                    h2: (a) => Number(a)
                }
            }
            const expectedResult = [
                {"h1":"data1data1","h2": NaN,"h3":"data3"},
                {"h1":"data4data4","h2": NaN,"h3":"data6"}
            ];
    
            const actualResult = parse(suite.testData, suite.testOpt);
            
            assert.deepEqual(expectedResult, actualResult);
        });


        it('should return proper value with types with gap', () => {
            suite.testData = `"h1","h2","h3"\n"data1","data2","data3"\n"data4","data5","data6"`;
            suite.testOpt = {
                types: {
                    h1: (a) => a + a,
                    h3: (a) => null
                }
            }
            const expectedResult = [
                {"h1":"data1data1","h2":"data2","h3": null},
                {"h1":"data4data4","h2":"data5","h3": null}
            ];
    
            const actualResult = parse(suite.testData, suite.testOpt);
            
            assert.deepEqual(expectedResult, actualResult);
        });

    });
    
});
