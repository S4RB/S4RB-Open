import { async, fakeAsync, TestBed, tick, getTestBed } from '@angular/core/testing';
import { HttpModule, Http, ConnectionBackend, XHRBackend,
         RequestOptions, Response, BaseRequestOptions, ResponseOptions} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { ComplaintReporterService } from './complaint-reporter.service';
import { Report } from './complaint-reporter.service';

describe('ComplaintReporterService', () => {
    let injector: TestBed,
        service: ComplaintReporterService,
        mockBackend,
        lastConnection;

    const date = new Date(2012, 6),
        oldReport = {
            Quarter: Math.ceil(date.getMonth() / 3) + 1,
            Month: date,
            Complaints: 27,
            UnitsSold: 4932508
        },
        updatedReport: Report = {
            Quarter: Math.ceil(date.getMonth() / 3) + 1,
            Month: date,
            Complaints: 27,
            UnitsSold: 4932508,
            month: date.getMonth(),
            year: date.getFullYear(),
            fake: false,
            CPMU: 5.473888739764841
        },
        fakeReport: Report = {
            Quarter: Math.ceil(date.getMonth() / 3) + 1,
            Month: date,
            Complaints: 0,
            UnitsSold: 0,
            month: date.getMonth(),
            year: date.getFullYear(),
            fake: true,
            CPMU: 0
        },
        reports = [ oldReport ],
        updatedReports = [ updatedReport ],
        filedReports = { quarter: { 2012: oldReport }, month: { 2012: oldReport } };

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                ComplaintReporterService,
                Http,
                { provide: ConnectionBackend, useClass: MockBackend},
                { provide: RequestOptions, useClass: BaseRequestOptions},
            ]
        });
    });

    beforeEach(() => {
        injector = getTestBed();
        service = injector.get(ComplaintReporterService);
        mockBackend = injector.get(ConnectionBackend) as MockBackend;
        mockBackend.connections.subscribe((connection: any) => lastConnection = connection);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('function: resolve', () => {
        it('should return an Observable<any>', fakeAsync(() => {
            const mockResponse = reports,
                  spy = spyOn(service, 'fileReports');
            let result: any;

            service.resolve().subscribe(res => {
                result = res;
            });

            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse,
            })));

            tick();
            expect(service.fileReports).toHaveBeenCalledWith(mockResponse);
        }));
    });

    // describe('function: fileReports', () => {
    //     it('should call setupReport with report', () => {
    //         const spy = spyOn(service, 'setupReport').and.returnValue(Observable.of(updatedReport));
    //         service.fileReports(reports);
    //         expect(service.setupReport).toHaveBeenCalledWith(reports[0]);
    //     });
    // });

    describe('function: setupReport', () => {
        it('should add properties to a report', () => {
            const report = service.setupReport(oldReport);
            expect(report).toEqual(updatedReport);
        });
    });

    describe('function: addYearToFiledReports', () => {
        it('should add a year to the filedReports', () => {
            service.fileReports(reports);
            const year = 2012;
            service.addYearToFiledReports(year);
            const years = Object.keys(service.filedReports.month);
            expect(Number(years[0])).toEqual(year);
        });
    });

    describe('function: addReportToFiledReports', () => {
        it('should add a report under the month and year of the report into the filedReports', () => {
            service.fileReports(reports);
            service.addYearToFiledReports(updatedReport.year);
            service.addReportToFiledReports(updatedReport);
            const monthReport = service.filedReports['month'][updatedReport.year][updatedReport.month];
            expect(monthReport).toEqual(updatedReport);
        });
        it('should add a report under the quarter and year of the report into the filedReports', () => {
            service.fileReports(reports);
            service.addYearToFiledReports(updatedReport.year);
            service.addReportToFiledReports(updatedReport);
            const monthReport = service.filedReports['quarter'][updatedReport.year][updatedReport.Quarter - 1];
            expect(monthReport[0]).toEqual(updatedReport);
        });
    });

    describe('function: addMissingReports', () => {
        it('should add a report for each month missing one', () => {
            service.fileReports(reports);
            service.addYearToFiledReports(updatedReport.year);
            service.addReportToFiledReports(updatedReport);
            service.addMissingReports(updatedReport.year);
            const monthReportsLength = service.filedReports['month'][updatedReport.year].length;
            expect(monthReportsLength).toEqual(12);
        });
    });

    describe('function: createQuarterReports', () => {
        it('should create 4 reports for the quarter', () => {
            service.fileReports(reports);
            service.addYearToFiledReports(updatedReport.year);
            service.addReportToFiledReports(updatedReport);
            service.createQuarterReports(updatedReport.year);
            const quarterReportsLength = service.filedReports['quarter'][updatedReport.year].length;
            expect(quarterReportsLength).toEqual(4);
        });
    });

    describe('function: createReport', () => {
        it('should create a report object', () => {
            const report = service.createReport(updatedReport.year, updatedReport.month, true);
            expect(report).toEqual(fakeReport);
        });
    });

    describe('function: calculateCPMU', () => {
        it('should calculate the CPMU', () => {
            const CPMU = service.calculateCPMU(updatedReport);
            expect(CPMU).toEqual(updatedReport.CPMU);
        });
    });
});
