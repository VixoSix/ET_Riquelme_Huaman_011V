import { TestBed } from '@angular/core/testing';

import { AsignaturasApiService } from './asignaturas-api.service';

describe('AsignaturasApiService', () => {
  let service: AsignaturasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaturasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
