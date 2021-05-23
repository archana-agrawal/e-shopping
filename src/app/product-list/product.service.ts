import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:3000/adminlogin/dashboard/allproduct";
  private url1 = "http://localhost:3000/adminlogin/dashboard/product/deleteproduct";

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts() {
    return this.http.get(this.url);
  }


  getproduct() {
    return this.http.get(this.url);
  }

  deleteProduct(productId: any) {
    return this.http.delete(this.url1 + '/' + productId);
  }


}
