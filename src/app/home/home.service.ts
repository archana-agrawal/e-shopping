import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000/adminlogin/dashboard/allproduct'


  getAllProducts() {
    return this.http.get(this.url)
  }


  getproduct() {
    return this.http.get(this.url)
  }
}
