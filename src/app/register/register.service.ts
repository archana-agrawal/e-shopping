import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = 'http://localhost:3000/register';
  private url1 = 'http://localhost:3000/allUsers';

  constructor(
    private http: HttpClient,
  ) { }

 addUsers(userId: string, username: string, firstname: string, lastname: string, phoneno: string, email: string, password: string){
  console.log(username);
  // const body = new FormData()
  //   body.append('userId', userId);
  //   body.append('username', username);
  //   body.append('firstname', firstname);
  //   body.append('lastname', lastname);
  //   body.append('phoneno', phoneno);
  //   body.append('email', email);
  //   body.append('password', password);
    // body.append('image', image);
    
    const body = {
      userId: userId,
      username: username,
      firstname: firstname,
      lastname: lastname,
      phoneno: phoneno,
      email: email,
      password: password,
    }
    console.log(body);
    return this.http.post(this.url,body);
 }

 getAllusers(){
   return this.http.get(this.url1);
 }

}
