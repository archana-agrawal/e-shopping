import { Component, OnInit } from '@angular/core';
import { UserOrderListService } from './user-order-list.service';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss']
})
export class UserOrderListComponent implements OnInit {

  id: number;
  products: any[];
  date: Date;

  constructor(
    private service: UserOrderListService,
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(){

    this.id = localStorage['id'];
    this.date = new Date();

    this.service.getAllProducts(this.id).subscribe((response: any) => {
      if(response['status'] == 'success'){
        this.products = response['data'];
        console.log(this.products);
      }else{
        console.log(response['error']);
      }
    })
  }

  isexpire(product: any){
    const currentdate= new Date();
    return new Date(product.deliveryDate).valueOf() < new Date(currentdate).valueOf();

  }

}
