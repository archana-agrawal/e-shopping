import { TestBed } from '@angular/core/testing';

import { EditCartProductService } from './edit-cart-product.service';

describe('EditCartProductService', () => {
  let service: EditCartProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCartProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
