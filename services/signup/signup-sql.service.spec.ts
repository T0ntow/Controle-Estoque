import { TestBed } from '@angular/core/testing';

import { SignupSqlService } from './signup-sql.service';

describe('SignupSqlService', () => {
  let service: SignupSqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupSqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
