import { TestBed } from '@angular/core/testing';

import { ProfesorApiService } from './profesor-api.service';

describe('ProfesorApiService', () => {
  let service: ProfesorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
