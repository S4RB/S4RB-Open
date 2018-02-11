import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class ComplaintReporterService {

    public formatReport: any;

    constructor(private http: Http) { }

    resolve(): Observable<any> {
        return this.http.get('api/CPMU')
           .map(res => this.formatData(res.json()))
           .catch(err => {
               console.log('Error getting complaints', err);
               return err;
           });
    }

    formatData(reports: any[]): any {
        this.formatReport = { month: {}, quarter: {} };
        reports.forEach(report => {
            // Add properties to the report
            report = this.setupReport(report);

            // If year of report isn't in formatReport, add it in
            if (!this.formatReport['month'][report.year]) {
                this.addYearToFormatReport(report.year);
            }
            // Add report into formatReport
            this.addReportToFormatReport(report);
        });

        // For each year, add missing resports & calculate quarter reports
        Object.keys(this.formatReport['month']).forEach(yr => {
            this.addMissingReports(Number(yr));
            this.createQuarterReports(Number(yr));
        });
        return this.formatReport;
    }

    setupReport(report: any): Report {
        const reportDate = new Date(report.Month);

        report.month = reportDate.getMonth();
        report.year = reportDate.getFullYear();
        report.fake = false;
        report.CPMU = this.calculateCPMU(report);
        return report;
    }

    addYearToFormatReport(year: number): void {
        this.formatReport['month'][year] = new Array(12);
        this.formatReport['quarter'][year] = [[], [], [], []];
    }

    addReportToFormatReport(report: Report): void {
        this.formatReport['month'][report.year][report.month] = report;
        this.formatReport['quarter'][report.year][report.Quarter - 1].push(report);
    }

    addMissingReports(year: number): void {
        for (let month = 0; month < 12; month++) {
            if (!this.formatReport['month'][year][month]) {
                this.formatReport['month'][year][month] = this.createReport(year, month, true);
            }
        }
    }

    createQuarterReports(year: number): void {
        let quarterCount = 0;
        this.formatReport['quarter'][year].forEach((quarter, index) => {
            const qReport = this.createReport(year, quarterCount * 3, !quarter.length);

            if (quarter.length) {
                quarter.forEach(report => {
                    qReport.Complaints += report.Complaints;
                    qReport.UnitsSold += report.UnitsSold;
                });
                qReport.CPMU = this.calculateCPMU(qReport);
            }
            this.formatReport['quarter'][year][index] = qReport;
            quarterCount ++;
        });
    }

    createReport(year: number, month: number, fake: boolean): Report {
        const date = new Date(year, month);

        return {
            Quarter: Math.ceil(month / 3),
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

