import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class ComplaintReporterService {

    public filedReports: any;

    constructor(private http: Http) { }

    resolve(): Observable<any> {
        return this.http.get('api/CPMU')
           .map(res => this.fileReports(res.json()))
           .catch(err => {
               console.log('Error getting complaints', err);
               return err;
           });
    }

    fileReports(reports: any[]): any {
        this.filedReports = { month: {}, quarter: {} };
        reports.forEach(report => {
            // Add properties to the report
            report = this.setupReport(report);

            // If year of report isn't in filedReports, add it in
            if (!this.filedReports['month'][report.year]) {
                this.addYearToFiledReports(report.year);
            }
            // Add report into filedReports
            this.addReportToFiledReports(report);
        });

        // For each year, add missing resports & calculate quarter reports
        Object.keys(this.filedReports['month']).forEach(yr => {
            this.addMissingReports(Number(yr));
            this.createQuarterReports(Number(yr));
        });
        return this.filedReports;
    }

    setupReport(report: any): Report {
        const reportDate = new Date(report.Month);

        report.month = reportDate.getMonth();
        report.year = reportDate.getFullYear();
        report.fake = false;
        report.CPMU = this.calculateCPMU(report);
        return report;
    }

    addYearToFiledReports(year: number): void {
        this.filedReports['month'][year] = new Array(12);
        this.filedReports['quarter'][year] = [[], [], [], []];
    }

    addReportToFiledReports(report: Report): void {
        this.filedReports['month'][report.year][report.month] = report;
        this.filedReports['quarter'][report.year][report.Quarter - 1].push(report);
    }

    addMissingReports(year: number): void {
        for (let month = 0; month < 12; month++) {
            if (!this.filedReports['month'][year][month]) {
                this.filedReports['month'][year][month] = this.createReport(year, month, true);
            }
        }
    }

    createQuarterReports(year: number): void {
        this.filedReports['quarter'][year].forEach((quarter, index) => {
            const qReport = this.createReport(year, index * 3, !quarter.length);

            if (quarter.length) {
                quarter.forEach(report => {
                    qReport.Complaints += report.Complaints;
                    qReport.UnitsSold += report.UnitsSold;
                });
                qReport.CPMU = this.calculateCPMU(qReport);
            }
            this.filedReports['quarter'][year][index] = qReport;
        });
    }

    createReport(year: number, month: number, fake: boolean): Report {
        const date = new Date(year, month);

        return {
            Quarter: Math.ceil(month / 3) + 1,
            Month: date,
            year: date.getFullYear(),
            month: date.getMonth(),
            fake: fake,
            UnitsSold: 0,
            Complaints: 0,
            CPMU: 0
        };
    }

    calculateCPMU(report: Report): number {
        return report.Complaints / (report.UnitsSold / 1000000);
    }

}

export interface Report {
    Quarter: number;
    Month: Date;
    year: number;
    month: number;
    fake: boolean;
    UnitsSold: number;
    Complaints: number;
    CPMU: number;
}

