import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ProductName: string;
  SearchArray: any[];
  msg: string;

  constructor(
    private router: Router,
    private service: SearchService,
  ) { }

  ngOnInit(): void {
    //this.loadflag();
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.ProductName = localStorage['searchValue'];
    console.log(this.ProductName);
    this.service.getSearch(this.ProductName).subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.SearchArray = response['data'];
        
        // console.log( this.SearchArray);
        // if(this.ProductName == ""){
        //   this.ngOnInit();
        // }else{
        //   this.SearchArray = this.SearchArray.filter(res => {
        //     return res.ProductName.toLocaleLowerCase().match(this.ProductName.toLocaleLowerCase());
        //   })
        // }
        // if (this.SearchArray.length == 0) {
        //   this.msg = "We did not find your matching result";
        // } else {
        //   this.msg = "We found these result";
        // }
      } else {
        alert('error');
      }
    })

    localStorage['onBack'] = 'searchProduct';
  }

  loadflag(){
    if (localStorage['flag'] == '0') {
      window.location.reload();
      localStorage['flag'] = '1'
    }
  }

  OnSelectProduct(id: number) {
    this.router.navigate(['/login/product-detail/' + id]);
  }

}
