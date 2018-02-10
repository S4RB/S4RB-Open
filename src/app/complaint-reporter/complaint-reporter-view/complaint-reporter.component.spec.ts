import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintReporterComponent } from './complaint-reporter.component';

describe('ComplaintReporterComponent', () => {
  let component: ComplaintReporterComponent;
  let fixture: ComponentFixture<ComplaintReporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintReporterComponent ]
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
});
