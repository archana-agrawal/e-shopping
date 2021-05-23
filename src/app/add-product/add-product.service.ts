import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private url = "http://localhost:3000/adminlogin/dashboard/product/add_product";
  private url1 = "http://localhost:3000/category";

  constructor(
    private http: HttpClient,
  ) { }

  addService(productId: any, name: string, price: string,discount: string,priceWithDiscount: string, mgfdate: string, description: string, image: File, categoryId: string, QuantityAvailable: string) {

    const body = new FormData()
    body.append('productId', productId);
    body.append('name', name)
    body.append('price', price)
    body.append('discount', discount)
    body.append('priceWithDiscount', priceWithDiscount)
    body.append('mgfdate', mgfdate)
    body.append('description', description)
    body.append('image', image)
    body.append('categoryId', categoryId)
    body.append('QuantityAvailable', QuantityAvailable)
    

    console.log(body);

    return this.http.post(this.url, body);
  } //end of addservive

  getCategories() {
    return this.http.get(this.url1)
  }

  addPicture(): void {
    
  }

}
