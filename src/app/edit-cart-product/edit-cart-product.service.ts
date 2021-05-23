import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditCartProductService {

  private url = "http://localhost:3000/login/product/";
  // private url1 =  "http://localhost:3000/login/";
  private url2 = "http://localhost:3000/login/cart/deleteproduct";

  constructor(
    private http: HttpClient,
  ) { }

    getProduct(id: number){
      return this.http.get(this.url + id);
    }

    // postInCart(Quantity: number, totalAmount: number, totalDiscount: number, userId: number, productId: number, image: File){
    //   const body = {
    //     Quantity: Quantity,
    //     totalAmount: totalAmount,
    //     totalDiscount: totalDiscount,
    //     userId: userId,
    //     productId: productId,
    //     image: image,
    //   };

    //   return this.http.put(this.url1, body);

    // }

    deleteFromCart(userId: number, productId: number){
      const body = {
        userId: userId,
        productId: productId,
      }
      return this.http.post(this.url2, body);
    }

}
