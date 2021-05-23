import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  private url = "http://localhost:3000/login/dashboard/product/editproduct/";
  private url1 = "http://localhost:3000/category";
  private url2 = "http://localhost:3000/login/product/";
  private url3 = "http://localhost:3000/login/cart/product/";
  private url4 = "http://localhost:3000/login/order/outofstock/";
  private url5 = "http://localhost:3000/sendmail/";

  constructor(
    private http: HttpClient,
  ) { }

  editProduct(productId: string, name: string, price: string, discount: string, priceWithDiscount: string, mgfdate: string, description: string, categoryId: string, image: File, QuantityAvailable: string) {
    const body = {
      productId: productId,
      name: name,
      price: price,
      discount: discount,
      priceWithDiscount: priceWithDiscount,
      mgfdate: mgfdate,
      description: description,
      categoryId: categoryId,
      image: image,
      QuantityAvailable: QuantityAvailable,
    };

    // const body = new FormData()
    // body.append('id', id);
    // body.append('name', name)
    // body.append('price', price)
    // body.append('discount', discount)
    // body.append('priceWithDiscount', priceWithDiscount)
    // body.append('mgfdate', mgfdate)
    // body.append('description', description)
    // body.append('categoryId', categoryId)

    console.log(body);

    return this.http.put(this.url + productId, body);
  }

  getProductDetails(productId: string){
    return this.http.get(this.url2 + productId);
  }


  getCategories() {
    return this.http.get(this.url1);
  }

  getOutofstock(productId: any){
    return this.http.get(this.url4 + productId);
  }

  sendMail(userId: any){
    const body = {
      userId: userId,
    }
    return this.http.post(this.url5, body);
  }

  // getCart(id: any){
  //   return this.http.get(this.url3 + id);
  // }

}
