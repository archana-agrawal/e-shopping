import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Allproducts: any[]
  user: any
  flag: boolean = true;
  search: string = localStorage['searchValue'];

  constructor(
    private router: Router,
    private service: HomeService,
  ) { }

  ngOnInit(): void {
    // if(this.flag){
    //   window.location.reload();
    //   this.flag = false;
    // }
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.service
      .getAllProducts()
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.Allproducts = response['data'];
          console.log(this.Allproducts);
        } else {
          alert('error')
        }
      })
      localStorage['onBack'] = 'user'
  }


    loadflag(){
        if(localStorage['flag']=='0')
        {
            window.location.reload();
            localStorage['flag']='1'
        }
    }


  OnSelectProduct(productId: number) {
    this.router.navigate(['/login/product-detail/'+ productId])
  }


}
