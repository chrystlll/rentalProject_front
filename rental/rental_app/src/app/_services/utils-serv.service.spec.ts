import { TestBed } from '@angular/core/testing';

import { UtilsServService } from './utils-serv.service';

describe('UtilsServService', () => {
  let service: UtilsServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
