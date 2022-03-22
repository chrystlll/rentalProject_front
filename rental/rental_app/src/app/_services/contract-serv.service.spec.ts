import { TestBed } from '@angular/core/testing';

import { ContractServService } from './contract-serv.service';

describe('ContractServService', () => {
  let service: ContractServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
