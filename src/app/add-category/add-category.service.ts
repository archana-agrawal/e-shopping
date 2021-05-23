import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddCategoryService {

  private url = "http://localhost:3000/category";

  constructor(
    private http: HttpClient,
  ) { }

  postCategory(id: string, title: string){
    // const body = new FormData();
    // body.append('id', id);
    // body.append('title', title);

    const body = {
      id: id,
      title: title,
    }

    console.log(body);
    return this.http.post(this.url, body);
  }

}
