import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserOrderListService {

  private url = "http://localhost:3000/login/myorder/"

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts(id: number){
    return this.http.get(this.url + id);
  }
}
