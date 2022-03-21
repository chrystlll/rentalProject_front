import { TestBed } from '@angular/core/testing';

import { ReadCSVServService } from './read-csvserv.service';

describe('ReadCSVServService', () => {
  let service: ReadCSVServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadCSVServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
