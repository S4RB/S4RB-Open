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
        lastConnection,
        spy;

    const year = 2012,
          month = 4,
          date = new Date(year, month);

    function getReport(yr, mth) {
        const d = new Date(yr, mth);

        return {
            Quarter: Math.floor(d.getMonth() / 3) + 1,
            Month: d,
            Complaints: 27,
            UnitsSold: 4932508,
            period: 'month',
            month: d.getMonth(),
            year: d.getFullYear(),
            fake: false,
            CPMU: 5.473888739764841
        };
    }

    function createPeriodReports(yr, period) {
        const values = [];

        for (let i = 0; i < period; i++) {
            values.push(getReport(yr, i));
        }
        return values;
    }

    const resolvedData = {
        month: createPeriodReports(year, 12),
        quarter: createPeriodReports(year, month)
    },
    oldReport = {
        Quarter: Math.floor(month / 3) + 1,
        Month: date,
        Complaints: 27,
        UnitsSold: 4932508
    },
    updatedReport = getReport(year, month),
    reports = createPeriodReports(2012, 3);

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
        spy = spyOn(service, 'processReports').and.returnValue(Observable.of(resolvedData));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('function: resolve', () => {
        it('should return an Observable<any>', fakeAsync(() => {
            let result: any;

            service.resolve().subscribe(res => {
                result = res;
            });

            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: resolvedData,
            })));

            tick();
            expect(service.processReports).toHaveBeenCalledWith(resolvedData);
        }));
    });

    // describe('function: processReports', () => {
    //     it('should call setupReport with report', () => {
    //         const spy = spyOn(service, 'setupReport').and.returnValue(Observable.of(updatedReport));
    //         service.processReports(reports);
    //         expect(service.setupReport).toHaveBeenCalledWith(reports[0]);
    //     });
    // });

    describe('function: setupReport', () => {
        it('should add properties to a report', () => {
            const report = service.setupReport(oldReport);
            expect(report).toEqual(updatedReport);
        });
    });

    describe('function: createReport', () => {
        it('should create a report object', () => {
            const report = service.createReport(updatedReport.year, updatedReport.month, 'month', false);
            updatedReport.Complaints = 0;
            updatedReport.UnitsSold = 0;
            updatedReport.CPMU = 0;
            expect(report).toEqual(updatedReport);
        });
    });

    describe('function: calculateCPMU', () => {
        it('should calculate the CPMU', () => {
            const CPMU = service.calculateCPMU(updatedReport);
            expect(CPMU).toEqual(updatedReport.CPMU);
        });

        it('should return zero if no complaints or sales', () => {
            updatedReport.Complaints = updatedReport.UnitsSold = 0;
            const CPMU = service.calculateCPMU(updatedReport);
            expect(CPMU).toEqual(0);
        });
    });

    describe('function: addMissingReports', () => {
        it('should add a report for each month missing one', () => {
            const years = [year],
                  missingReports = service.addMissingReports(years, [updatedReport]);
            expect(missingReports.length).toEqual(11);
        });
    });

    describe('function: createPeriodReports', () => {
        it('should create period reports', () => {
            const period = { name: 'quarter', months: 3 },
                  periodReport = service.createPeriodReports(reports, period);
            let CPMU = 0,
                complaints = 0,
                unitsSold = 0;

            for (let i = 0; i < reports.length; i++) {
                complaints += reports[i].Complaints;
                unitsSold += reports[i].UnitsSold;
            }
            CPMU = complaints / (unitsSold / 1000000);
            expect(periodReport[0].Complaints).toEqual(complaints);
            expect(periodReport[0].UnitsSold).toEqual(unitsSold);
            expect(periodReport[0].CPMU).toEqual(CPMU);
        });
    });

});
