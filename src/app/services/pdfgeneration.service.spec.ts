import { TestBed } from '@angular/core/testing';

import { PdfgenerationService } from './pdfgeneration.service';

describe('PdfgenerationService', () => {
  let service: PdfgenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfgenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
