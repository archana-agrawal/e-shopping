import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:3000/login/addCart";
  private url1 = "http://localhost:3000/login/cart";
  private url2 = "http://localhost:3000/login/products/"
  private url3 = "http://localhost:3000/login/order/outofstock";


  constructor(
    private http: HttpClient,
  ) { }

    getCart(userId: number){
      const body = {
        userId: userId,
      }
      return this.http.post(this.url, body);
    }

    postInCart(Quantity: number,userId: number, productId: number){
      const body = {
        Quantity: Quantity,
        userId: userId,
        productId: productId,
      };
      console.log(body);
      return this.http.post(this.url1, body);

    }

    OutofStock(userId: any, productId: any){
      const body = {
        userId: userId,
        productId: productId,
      }
      return this.http.post(this.url3, body);
    }
  

}
