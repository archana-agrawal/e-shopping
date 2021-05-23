import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    private url = 'http://localhost:3000/login'   //express port 4000

    constructor(private http: HttpClient){
     }
    
     login(email:String, password:String){
        const body = {
             email:email,
             password:password
         }

         return this.http.post(this.url,body);
     }


}