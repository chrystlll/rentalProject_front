import { TestBed } from '@angular/core/testing';

import { PlaceServService } from './place-serv.service';

describe('PlaceServService', () => {
  let service: PlaceServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
