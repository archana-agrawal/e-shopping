import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[];
  search: string = localStorage['searchValue'];

  constructor(
    private router: Router,
    private service: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  onAddProduct() {
    this.router.navigate(['/adminlogin/dashboard/product/add_product'])
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }


  loadAllProducts() {
    this.service
      .getAllProducts()
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.products = response['data']
        } else {
          alert('error');
        }
      })
  }

  ondelete(productId: number) {
    this.service
      .deleteProduct(productId)
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.loadAllProducts();
        } else {
          console.log(response['error'])
        }
      })
  }


  onSelect(productId: string) {
    this.router.navigate(['/adminlogin/dashboard/product/edit_product/' + productId])
  }

}
