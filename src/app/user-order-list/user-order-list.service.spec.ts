import { TestBed } from '@angular/core/testing';

import { UserOrderListService } from './user-order-list.service';

describe('UserOrderListService', () => {
  let service: UserOrderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOrderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
