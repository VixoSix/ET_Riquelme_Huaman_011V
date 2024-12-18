import { TestBed } from '@angular/core/testing';

import { QrsGeneradosApiService } from './qrs-generados-api.service';

describe('QrsGeneradosApiService', () => {
  let service: QrsGeneradosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrsGeneradosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
