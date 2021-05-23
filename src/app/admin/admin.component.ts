import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  email1 = ''
  password1 = ''

  onlogin(){
      if(this.email1 == "archana" && this.password1 == "1234"){
          this.router.navigate(['/dashboard'])
      }
      else
      {
          alert('enter the vaild password');
      }
      
  }

}
