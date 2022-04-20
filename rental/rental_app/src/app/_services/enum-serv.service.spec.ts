import { TestBed } from '@angular/core/testing';

import { EnumTypeServService } from './enum-serv.service';

describe('EnumTypeServService', () => {
  let service: EnumTypeServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumTypeServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
