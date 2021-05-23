import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditCategoryService {

  private url = "http://localhost:3000/category/"

  constructor(
    private http: HttpClient,
  ) { }

  getCategoryDetails(id: string){
    return this.http.get(this.url + id);
  }

  editCategory(id: string, title: string){
    const body = {
      id: id,
      title: title,
    };
    return this.http.put(this.url + id, body);
  }
}
