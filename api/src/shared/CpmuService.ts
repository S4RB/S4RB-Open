import {months} from "../constants";
import {Complain, ComplainMonthlyResult, ComplainQuarterResult} from "../types/ComplainTypes";

export default  class CpmuService {
    constructor() { }

    public static sortByMonth(complains: Complain[]): ComplainMonthlyResult[] {
        if (!Array.isArray(complains)) {
            return []
        }

        const result = [];

        const dateIteratorC = complains
            .reduce((pre: Complain, cur: Complain) => new Date(pre.Month) > new Date(cur.Month) ? cur : pre );
        const latestC = complains
            .reduce((pre: Complain, cur: Complain) => new Date(pre.Month) < new Date(cur.Month) ? cur : pre );

        let dateIterator: Date = new Date(dateIteratorC.Month);
        const latest: Date     = new Date(latestC.Month);

        result.push(dateIteratorC);

        do {
            const availableCmpl: (Complain | undefined) = complains.find((c: Complain) => {
                const cmplDate = new Date(c.Month);

                return dateIterator.getFullYear()  === cmplDate.getFullYear() &&
                       dateIterator.getMonth() + 1 === cmplDate.getMonth()
            });

            result.push(availableCmpl || {
                Month: dateIterator,
                Quarter: Math.floor((dateIterator.getMonth() + 3) / 3),
                Complaints: null,
                UnitsSold: null
            });

            dateIterator = new Date(dateIterator.setMonth(dateIterator.getMonth() + 1));

        } while (dateIterator < latest);

        return result
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
                    let compl = c.Complaints;
                    let units = c.UnitsSold;

                    cmpu = compl ? (+compl / (+units / 1e6)).toFixed(2) : 0;

                    if(compl === null || units === null) {
                        cmpu = 'No value';
                    }

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
                        unitsSold:  +c.UnitsSold,
                        complaints: +c.Complaints,
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