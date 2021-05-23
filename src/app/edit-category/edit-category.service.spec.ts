import { TestBed } from '@angular/core/testing';

import { EditCategoryService } from './edit-category.service';

describe('EditCategoryService', () => {
  let service: EditCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
