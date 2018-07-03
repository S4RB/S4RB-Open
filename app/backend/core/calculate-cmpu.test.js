const { assert } = require('chai');
const { calculateCMPU } = require('./calculate-cmpu');

describe('#calculateCMPU', () => {

    it('complaints is zero', () => {
        const complaints = 10;
        const unitsSold = 0;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 0);
    });

    it('unitsSold is zero', () => {
        const complaints = 0;
        const unitsSold = 10;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 0);
    });

    it('both zeros edge case', () => {
        const complaints = 0;
        const unitsSold = 0;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 0);
    });

    it('more complaints than units sold', () => {
        const complaints = 10;
        const unitsSold = 1;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 10000000);
    });

    it('more units sold than complaints', () => {
        const complaints = 10;
        const unitsSold = 100;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 100000);
    });

    it('primes variation #1', () => {
        const complaints = 13;
        const unitsSold = 17;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 764705.88235294);
    });

    it('primes variation #2', () => {
        const complaints = 17;
        const unitsSold = 13;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 1307692.30769231);
    });

    it('over million units sold', () => {
        const complaints = 1;
        const unitsSold = (10 ** 6) + 1;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 0.999999);
    });
    
    it('over million complaints', () => {
        const complaints = (10 ** 6) + 1;
        const unitsSold = 1;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 1000001000000);
    });

    it('both values over million', () => {
        const complaints = (10 ** 6) + 1;
        const unitsSold = (10 ** 6) + 1;

        const actualResult = calculateCMPU(complaints, unitsSold);

        assert.strictEqual(actualResult, 1000000);
    });

});
