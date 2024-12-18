import { TestBed } from '@angular/core/testing';

import { AsistenciaApiService } from './asistencia-api.service';

describe('AsistenciaApiService', () => {
  let service: AsistenciaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
