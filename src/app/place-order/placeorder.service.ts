import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceorderService {

  private url = "http://localhost:3000/login/user/location";
  private url1 = "http://localhost:3000/login/orderplaced"

  constructor(
    private http: HttpClient,
  ) { }

  InsertLocation(fullname: String, phoneno: String, state: String, city: String, pincode: String, address: String, userId: number) {
    const body = {
      userId: userId,
      fullname: fullname,
      phoneno: phoneno,
      state: state,
      city: city,
      pincode: pincode,
      address: address,
    }

    return this.http.post(this.url, body);
  }

  // OrdersDetails(OrderDate: String, deliveryDate: String, PaymentMode: number, userId: number, userName: String, addressOfuser: String, userPhoneno: String) {
  //   const body = {
  //     OrderDate: OrderDate,
  //     deliveryDate: deliveryDate,
  //     PaymentMode: PaymentMode,
  //     userId: userId,
  //     userName: userName,
  //     addressOfuser: addressOfuser,
  //     userPhoneno: userPhoneno,
  //   };

  //   return this.http.post(this.url2, body);

  // }

 

  orderPlaced(userId: any, name: any, Quantity: any, totalAmount: any, totalDiscount: any, image: File, OrderDate: String, deliveryDate: String, PaymentMode: number, addressOfuser: String, userPhoneno: String){
    const body = {
      userId: userId,
      name: name,
      Quantity: Quantity,
      totalAmount: totalAmount,
      totalDiscount: totalDiscount, 
      image: image,
      OrderDate: OrderDate,
      deliveryDate: deliveryDate,
      PaymentMode: PaymentMode,
      addressOfuser: addressOfuser,
      userPhoneno: userPhoneno,
    };
    return this.http.post(this.url1, body);
  }

}
