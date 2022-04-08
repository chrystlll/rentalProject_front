import { TestBed } from '@angular/core/testing';

import { PaymentServService } from './payment-serv.service';

describe('PaymentServService', () => {
  let service: PaymentServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
