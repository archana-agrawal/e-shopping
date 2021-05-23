import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../product-details/product-details.service';
import { CartService } from './cart.service';
// import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  Cart: any[];
  CartInfo: any[];

  // CartInfo: {
  //   name: string,
  //   image:File,
  // };
  Cartdetails = new Array<{
    name: string,
    image: File,
    Quantity: any,
    QuantityAvailable: string;
    totalAmount: any,
    totalDiscount: any,
  }>();



  Products: any;

  TotalAmountOfProduct: number = 0;
  TotalSaved: number = 0;
  msg: string;
  userId = localStorage['id'];
  empty: boolean;
  QuantityAvailable: string;
  name: string;


  constructor(
    private service: CartService,
    private route: Router,
    private productdetailservice: ProductDetailsService,
  ) { }

  ngOnInit(): void {

    if (localStorage['login_status'] != '1') {
      alert('You are not logged in');
      this.route.navigate(['/login']);
    }

    // this.mergeDetails();
    this.loadProduct();
    this.TotalAmountOfProduct;
  }

  loadProduct() {

    this.service.getCart(this.userId).subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.Cart = response['data'];
        this.CartInfo = this.Cart;
        console.log(this.Cart);

        if (this.Cart.length == 0) {
          this.msg = "Your Cart is Empty !";
          this.empty = true;
        } else {
          this.msg = "Your items list";
          this.empty = false;
          this.getDetails();
        }

      } else {
        console.log(response['error']);
      }
    })

  }

  onEdit(productId: number, userId: number, Quantity: number) {
    localStorage['orderDetailsUserID'] = userId;
    localStorage['Quantity'] = Quantity;
    this.route.navigate(['/login/cartEdit/' + productId]);
  }

  onOrderPlace() {
    this.route.navigate(['/login/cart/placeorder']);
  }

  getDetails() {
    for (let i = 0; i < this.Cart.length; i++) {

      this.productdetailservice.getProduct(this.Cart[i].productId).subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.Products = response['data'];

          this.CartInfo[i] = Object.assign(this.CartInfo[i], {
            name: this.Products.name,
            totalAmount: this.Products.priceWithDiscount * this.Cart[i].Quantity,
            QuantityAvailable: this.Products.QuantityAvailable,
            totalDiscount: this.Products.discount * this.Cart[i].Quantity,
            image: this.Products.image,
          });
          this.TotalAmountOfProduct += this.CartInfo[i].totalAmount;
          this.TotalSaved += this.CartInfo[i].totalDiscount;

          if (this.Products.QuantityAvailable == 0) {
            this.service.OutofStock(this.Cart[i].userId, this.Cart[i].productId).subscribe((response: any) => {
              if (response['status'] == 'success') {
                console.log('Added in Out of Stock table!');
              } else {
                console.log(response['error']);
              }
            })
          }

        } else {
          console.log(response['error']);
          alert('error');
        }
      })
    }

  }



}
