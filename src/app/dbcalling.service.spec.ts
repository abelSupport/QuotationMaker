import { TestBed } from '@angular/core/testing';

import { DbcallingService } from './dbcalling.service';

describe('DbcallingService', () => {
  let service: DbcallingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbcallingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
