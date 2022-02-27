import { TestBed } from '@angular/core/testing';

import { AddressServService } from './address-serv.service';

describe('AddressServService', () => {
  let service: AddressServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
