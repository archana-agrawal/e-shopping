import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = "http://localhost:3000/category";

  constructor(
    private http: HttpClient,
  ) { }

  getCategory(){
    return this.http.get(this.url);
  }

  deleteCategory(id: string){
    return this.http.delete(this.url + '/' + id);
  }

}
