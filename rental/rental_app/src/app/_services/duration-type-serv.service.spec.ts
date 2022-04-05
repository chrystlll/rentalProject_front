import { TestBed } from '@angular/core/testing';

import { DurationTypeServService } from './duration-type-serv.service';

describe('DurationTypeServService', () => {
  let service: DurationTypeServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DurationTypeServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
