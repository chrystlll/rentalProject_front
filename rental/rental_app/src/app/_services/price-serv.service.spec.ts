import { TestBed } from '@angular/core/testing';

import { PriceServService } from './price-serv.service';

describe('PriceServService', () => {
  let service: PriceServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
