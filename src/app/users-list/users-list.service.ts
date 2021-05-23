import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  private url = "http://localhost:3000/allUsers";

  constructor(
    private http: HttpClient,
  ) { }

    getUsers(){
      return this.http.get(this.url);
    }

}
