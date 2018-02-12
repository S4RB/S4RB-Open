import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Data } from '@angular/router';

import { ComplaintReporterComponent } from './complaint-reporter.component';

describe('ComplaintReporterComponent', () => {
    let component: ComplaintReporterComponent;
    let fixture: ComponentFixture<ComplaintReporterComponent>;

    function getReport(year, month) {
        const date = new Date(year, month);
        return {
            Quarter: Math.ceil(date.getMonth() / 3) + 1,
            Month: date,
            Complaints: 27,
            UnitsSold: 4932508,
            month: date.getMonth(),
            year: date.getFullYear(),
            fake: false,
            CPMU: 5.473888739764841
        };
    }

    function createPeriodReports(year, period) {
        const values = [];

        for (let i = 0; i < period; i++) {
            values.push(getReport(year, i));
        }
        return values;
    }

    const resolvedData = {
        month: { 2012: createPeriodReports(2012, 12) },
        quarter: { 2012: createPeriodReports(2012, 4) }
    };
    console.log(resolvedData);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                ComplaintReporterComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { data: {
                        subscribe: (fn: (value: Data) => void) => fn({
                          complaints: resolvedData
                        })
                    }}
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComplaintReporterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have complaints', () => {
        expect(component.complaints).toEqual(resolvedData);
    });

    it('should have an array of years from the report', () => {
        expect(component.years).toEqual(Object.keys(resolvedData.month));
    });

    it('should have an array of periods from the report', () => {
        expect(component.periods).toEqual(Object.keys(resolvedData));
    });

    it('should set an initial period', () => {
        expect(component.period).toEqual(Object.keys(resolvedData)[0]);
    });
});
