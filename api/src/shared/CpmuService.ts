import {months} from "../constants";
import {Complain, ComplainMonthlyResult, ComplainQuarterResult} from "../types/ComplainTypes";

export default  class CpmuService {
    constructor() { }

    public static sortByMonth(complains: Complain[]): ComplainMonthlyResult[] {
        if (!Array.isArray(complains)) {
            return []
        }

        return complains
            .map((c: Complain) => {
                let monthString: string;
                let cmpu: number | string;

                try {
                    const month: Date = new Date(c.Month);
                    monthString = `${month.getFullYear()} ${months[month.getMonth()]}`;
                } catch (e) {
                    monthString = 'unknown';
                }

                try {
                    let compl = +c.Complaints;
                    let units = +c.UnitsSold / 1e6;

                    cmpu = compl ? (compl / units).toFixed(2) : 0
                } catch (e) {
                    cmpu = 'No value';
                }

                return {
                    month: monthString,
                    quarter: c.Quarter,
                    cpmu: cmpu
                }
            });
    }

    public static sortByQuarter(complains: Complain[]): ComplainQuarterResult[] {
        if (!Array.isArray(complains)) {
            return []
        }

        const yearQuarterRes = {};
        const results: ComplainQuarterResult[] = [];

        console.log(complains);

        complains
            .map((c: Complain) => {
                let year: string;
                let quarter: string = c.Quarter || 'unknown';

                try {
                    year = String(new Date(c.Month).getFullYear());
                } catch (e) {
                    year = 'unnown';
                }

                if(!yearQuarterRes.hasOwnProperty(year)) {
                    yearQuarterRes[year] = {};
                }

                if(!yearQuarterRes[year].hasOwnProperty(quarter)) {
                    yearQuarterRes[year][quarter] = {
                        unitsSold:  c.UnitsSold,
                        complaints: c.Complaints,
                    }
                } else {
                    try {
                        yearQuarterRes[year][quarter].unitsSold += +c.UnitsSold;
                        yearQuarterRes[year][quarter].complaints += +c.Complaints;
                    } catch (e) { }
                }
            });

        for (let year in yearQuarterRes) {
            for (let quarter in yearQuarterRes[year]) {
                if(!yearQuarterRes[year].hasOwnProperty(quarter)) continue;

                let cmpu: number | string;
                try {
                    const compl = yearQuarterRes[year][quarter].complaints;
                    const units = yearQuarterRes[year][quarter].unitsSold / 1e6;

                    cmpu = (compl / units).toFixed(2)
                } catch (e) {
                    cmpu = 'No value'
                }

                results.push({
                    year: year,
                    quarter: quarter,
                    cpmu: cmpu
                });
            }
        }

        return results;
    }
}