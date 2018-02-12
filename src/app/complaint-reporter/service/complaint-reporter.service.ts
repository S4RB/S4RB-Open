import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class ComplaintReporterService {

    public filedReports: any;
    public periods: Period[] = [
        { name: 'quarter', months: 3 }
    ];

    constructor(private http: Http) { }

    resolve(): Observable<any> {
        return this.http.get('api/CPMU')
                   .map(res => this.processReports(res.json()))
                   .catch(err => {
                       console.log('Error getting complaints', err);
                       return err;
                   });
    }

    processReports(reports) {
        const folder = {},
              years = [];

        // Setup report
        reports.forEach(report => {
            report = this.setupReport(report);
            if (!years.includes(report.year)) { years.push(report.year); }
        });

        // Add missing reports
        reports = reports.concat(this.addMissingReports(years, reports));

        // Add month reports to folder
        folder['month'] = reports = reports.sort((a, b) =>  a.Month - b.Month);

        // Create & add period reports to folder
        this.periods.forEach(period => {
            folder[period.name] = this.createPeriodReports(reports, period);
            folder[period.name].sort((a, b) =>  a.Month - b.Month);
        });

        return folder;
    }

    setupReport(report: any): Report {
        const date = new Date(report.Month);
        report.Month = date;
        report.year = date.getFullYear();
        report.month = date.getMonth();
        report.period = 'month';
        report.fake = false;
        report.CPMU = this.calculateCPMU(report);
        return report;
    }

    createReport(year: number, month: number, period: string, fake: boolean): Report {
        const date = new Date(year, month);

        return {
            Quarter: Math.floor(month / 3) + 1,
            Month: date,
            year: year,
            month: month,
            period: period,
            fake: fake,
            UnitsSold: 0,
            Complaints: 0,
            CPMU: 0
        };
    }

    calculateCPMU(report: Report): number {
        return (report.Complaints === 0 && report.UnitsSold === 0) ? 0 :
                            report.Complaints / (report.UnitsSold / 1000000);
    }

    addMissingReports(years: number[], reports: Report[]): Report[] {
        const missingReports = [];
        years.forEach(year => {
            for (let month = 0; month < 12; month++) {
                const monthReport = reports.find(report => report.year === year && report.month === month);

                if (!monthReport) {
                    missingReports.push(this.createReport(year, month, 'month', true));
                }
            }
        });
        return missingReports;
    }

    createPeriodReports(reports: Report[], period: Period): Report[] {
        const allPeriodReports = [];
        let periodReport;

        for (let i = 0; i < reports.length; i++) {
            // Create new report for period
            if (i % period.months === 0) {
                periodReport = this.createReport(reports[i].year, reports[i].month, period.name, false);
            }

            periodReport.Complaints += reports[i].Complaints;
            periodReport.UnitsSold += reports[i].UnitsSold;

            // If last month of period, calc CPMU and add to allPeriodReports
            if (i % period.months === period.months - 1) {
                periodReport.CPMU = this.calculateCPMU(periodReport);
                if (periodReport.CPMU === 0) { periodReport.fake = true; }
                allPeriodReports.push(periodReport);
            }
        }
        return allPeriodReports;
    }

}

export interface Report {
    Quarter: number;
    Month: Date;
    year: number;
    month: number;
    period: string;
    fake: boolean;
    UnitsSold: number;
    Complaints: number;
    CPMU: number;
}

export interface Period {
    name: string;
    months: number;
}

