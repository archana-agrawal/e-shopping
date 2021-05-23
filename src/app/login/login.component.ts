import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

// import * as toastr from 'toastr';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    email: string = ''
    password: string = ''
    rememberme: boolean = false
    isLoggedIn = false;
    isActiveToggleTextPassword: boolean = false;
    passwordtype: string = 'password';

    constructor(private router: Router,
        private service: LoginService) { }

    getType() {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    }  

    toggleTextPassword(): void{
        this.passwordtype = this.passwordtype === 'text' ? 'password' : 'text';
    }

    toggleShow() {
        this.passwordtype = this.passwordtype === 'text' ? 'password' : 'text';
        // this.showPassword = !this.showPassword;
        // this.input.type = this.showPassword ? 'text' : 'password';
    } 

    onlogin() {
        if (this.email.length == 0) {
            alert('email field can not be empty')
        }
        else if (this.password.length == 0) {
            alert('password can not be empty')
        }
        else {

            this.service.login(this.email, this.password).subscribe((response: any) => {

                console.log(response);
                if (response['status'] == 'success') {
                    localStorage['login_status'] = '1'
                    localStorage['username'] = response['data'].username;
                    localStorage['id'] = response['data'].userId;
                    localStorage['flag'] = '0'

                    this.router.navigate(['/home']);
                }
                else if (response['status'] == 'error') {

                    alert('invaild email or password')
                }

            })

        }

    }


}