import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCartProductComponent } from './edit-cart-product.component';

describe('EditCartProductComponent', () => {
  let component: EditCartProductComponent;
  let fixture: ComponentFixture<EditCartProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCartProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCartProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
