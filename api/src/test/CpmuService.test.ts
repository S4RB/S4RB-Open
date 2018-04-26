import { expect } from 'chai';

import CpmuService from '../shared/CpmuService';
import { Complain, ComplainMonthlyResult, ComplainQuarterResult } from '../types/ComplainTypes';

const complainCSVJson: Complain[] = [
    {
        Quarter: "1",
        Month: "2012-01-01T00:00:00",
        Complaints: "27",
        UnitsSold: "4932508"
    }, {
        Quarter: "1",
        Month: "2012-02-01T00:00:00",
        Complaints: "5",
        UnitsSold: "86720"
    }, {
        Quarter: "2",
        Month: "2012-04-01T00:00:00",
        Complaints: "10",
        UnitsSold: "824680"
    }
];

describe("Cpmu monthly fill missing month", () =>{
    it("filled", () => {
        const resultsList: ComplainMonthlyResult[] = CpmuService.sortByMonth(complainCSVJson);
        expect(resultsList).to.be.an('array');
        expect(resultsList.length).to.be.equal(4);
        expect(resultsList[2]).to.deep.include({ month: '2012 March' });
    });
});

describe("Cpmu quarterly set quarter", () => {
    it("as expected", () => {
        const resultsList: ComplainQuarterResult[] = CpmuService.sortByQuarter(complainCSVJson);
        expect(resultsList).to.be.an('array');
        expect(resultsList[1]).to.deep.include({ quarter: "2" });
    });
});
