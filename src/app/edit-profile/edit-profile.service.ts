import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private url = "http://localhost:3000/login/myprofile/";
  private url1 = "http://localhost:3000/login/myprofile/editdetails/";

  constructor(
    private http: HttpClient,
  ) { }

  getUserDetailsById(id: any) {
    console.log(id);
    return this.http.get(this.url + id);
  }

  updateUserDetails(id: string, username: string, firstname: string, lastname: string, phoneno: string, email: string, password: string, image: File) {

    const body = new FormData()
    body.append('userId', id);
    body.append('username', username);
    body.append('firstname', firstname);
    body.append('lastname', lastname);
    body.append('phoneno', phoneno);
    body.append('email', email);
    body.append('password', password);
    body.append('image', image);
    // const body = {
    //   userId: id,
    //   username: username,
    //   firstname: firstname,
    //   lastname: lastname,
    //   phoneno: phoneno,
    //   email: email,
    //   password: password,
    //   image: image,
    // }
    return this.http.put(this.url1 + id, body);
  }

}
