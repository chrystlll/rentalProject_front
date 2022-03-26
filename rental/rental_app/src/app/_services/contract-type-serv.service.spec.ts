import { TestBed } from '@angular/core/testing';

import { ContractTypeServService } from './contract-type-serv.service';

describe('ContractTypeServService', () => {
  let service: ContractTypeServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractTypeServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
