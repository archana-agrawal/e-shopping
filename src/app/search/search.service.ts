import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = "http://localhost:3000/login/search";

  constructor(
    private http: HttpClient,
  ) { }

  getSearch(ProductName:String) {

    const body = {
       ProductName:ProductName
    }

   return this.http.post(this.url,body)
 }


}
