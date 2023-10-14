import { TestBed } from '@angular/core/testing';

import { ProductsSqlService } from './products-sql.service';

describe('ProductsSqlService', () => {
  let service: ProductsSqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
