import { TestBed } from '@angular/core/testing';

import { MainTenantServService } from './main-tenant-serv.service';

describe('MainTenantServService', () => {
  let service: MainTenantServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainTenantServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
