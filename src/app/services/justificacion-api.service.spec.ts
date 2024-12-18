import { TestBed } from '@angular/core/testing';

import { JustificacionApiService } from './justificacion-api.service';

describe('JustificacionApiService', () => {
  let service: JustificacionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JustificacionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
