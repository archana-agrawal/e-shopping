import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EditProfileService } from '../edit-profile/edit-profile.service';
import { CartService } from '../cart/cart.service';
import { SearchService } from '../search/search.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  ngOnInit() {
    this.loadStatus();
    localStorage['searchValue'] = this.name;
    this.homeservice.getAllProducts().subscribe((response: any) => {
      if(response['status'] == 'success'){
        this.SearchArray = response['data'];
        console.log(this.SearchArray);
      }
    })
  }

  title = 'tracker';
  isLoggedIn = false
  username: String;
  id: number;
  name: string;
  image: File;
  count: number = 0;
  //search: string;

  status = localStorage['login_status']

  constructor(
    private router: Router,
    private service: EditProfileService,
    private cartservice: CartService,
    private homeservice: HomeService,
  ) { }

  canActivate() {
    this.loadStatus();
    return true;
  }


  loadStatus() {
    if (this.status == '1') {
      this.isLoggedIn = true
      this.username = localStorage['username'];
      this.id = localStorage['id'];
      this.getUser();
      this.getCartCount();
      console.log(this.id);
    }
  }

  getUser() {
    this.service.getUserDetailsById(this.id).subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.image = response['data'].image;
      }
    })
  }

  getCartCount(){
    this.cartservice.getCart(this.id).subscribe((response: any) => {
      if(response['status'] == 'success'){
        this.count = response['data'].length;
        console.log(this.count);
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }


  onLogout() {
    if (confirm('Are you sure to log out')) {
      this.isLoggedIn = false
      localStorage['login_status'] = '0'
      localStorage['username'] = null
      localStorage['id'] = null;

      this.router.navigate(['/login'])
    }
  }

  SearchArray: any[];

  Search(value: any) {
    this.name = value;
    localStorage['searchValue'] = this.name;
    if(this.name == ""){
      this.ngOnInit();
    }else{
      this.SearchArray = this.SearchArray.filter((res: any) => {
        return res?.name?.toLocaleLowerCase().match(this.name?.toLocaleLowerCase());
      })
    }
    // this.router.navigate(['/login/search']);
  }

}
