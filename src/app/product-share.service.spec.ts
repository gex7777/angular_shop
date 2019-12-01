import { TestBed } from '@angular/core/testing';

import { ProductShareService } from './product-share.service';

describe('ProductShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductShareService = TestBed.get(ProductShareService);
    expect(service).toBeTruthy();
  });
});
