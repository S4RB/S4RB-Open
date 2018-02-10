import { TestBed, inject } from '@angular/core/testing';

import { ComplaintReporterService } from './complaint-reporter.service';

describe('ComplaintReporterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplaintReporterService]
    });
  });

  it('should be created', inject([ComplaintReporterService], (service: ComplaintReporterService) => {
    expect(service).toBeTruthy();
  }));
});
