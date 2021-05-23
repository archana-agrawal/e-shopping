import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private url = "http://localhost:3000/login/product/";
  private url2 = "http://localhost:3000/login/cart/product/";
  
  constructor(
    private http: HttpClient,
  ) { }

    getProduct(productId: number){
      return this.http.get(this.url + productId);
    }

    updateProductInCart(Quantity: number, userId: number, productId: number){
      const body = {
        Quantity: Quantity,
        userId: userId,
        productId: productId,
      };

      console.log(body);
      return this.http.put(this.url2, body);
    }

}
