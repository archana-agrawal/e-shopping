import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { ProductDetailsService } from '../product-details/product-details.service';
import { EditCartProductService } from './edit-cart-product.service';

@Component({
  selector: 'app-edit-cart-product',
  templateUrl: './edit-cart-product.component.html',
  styleUrls: ['./edit-cart-product.component.scss']
})
export class EditCartProductComponent implements OnInit {

  productId: number;
  product: any;
  count: number = 1;
  temp: number;
  totalDiscount: number;
  rate: number;
  image: File;
  userId: number;
  name: string;
  QuantityAvailable: string;

  constructor(
    private service: EditCartProductService,
    private activateRoute: ActivatedRoute,
    private route: Router,
    private cartservice: CartService,
    private productservice: ProductDetailsService,
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {

    this.productId = this.activateRoute.snapshot.params['productId'];
    console.log(this.productId);

    this.service.getProduct(this.productId).subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.product = response['data'];
        this.rate = this.product.priceWithDiscount
        this.temp = this.rate
        this.image = this.product.image;
        this.name = this.product.name;
      } else {
        console.log(response['error']);
        alert('error');
      }

      this.count = parseInt(localStorage['Quantity']);
      this.rate = this.count * this.temp;
    });

   
  }

  OnIncrement() {
    this.count = this.count + 1
    this.rate = this.temp * this.count
  }

  OnDecrement() {
    if (this.count == 0) {
      alert('Can not decrement')
    }
    else {
      this.count = this.count - 1
      this.rate = this.temp * this.count
    }
  }

  onAddToCart(){
    if(localStorage['login_status'] == '0'){
      alert('You need to Login First!');
      this.route.navigate(['/login']);
    }else{

      this.userId = localStorage['id'];
      this.productId = this.activateRoute.snapshot.params['productId'];
      this.totalDiscount = (this.product.price * this.count) - this.rate;

      if(this.count != 0){

        this.cartservice.getCart(this.userId).subscribe((response: any) => {
          if (response['status'] == 'success') {
            let products: any[];
            products = response['data'];
  
            for (let i = 0; i < products.length; i++) {
              if (products[i].productId == this.productId) {
               
                this.updateInCart();
              }
            }

            // if (!productExist) {
            //   this.postInCart();
            // }
            
          }
        })
        

      }else{
        this.service.deleteFromCart(this.userId, this.productId).subscribe((response: any) => {
          if(response['status'] == 'success'){
            alert('Item Updated!');
            this.route.navigate(['/login/cart']);
          }
        })
      }

    }
  }
  
  updateInCart() {
    this.productservice.updateProductInCart(this.count, this.userId, this.productId).subscribe((response: any) => {
      if (response['status'] == 'success') {
        alert('items added in your cart');
        this.route.navigate(['/login/cart']);
      }
    })
  }

  // postInCart(){
  //   this.cartservice.postInCart(this.count, this.rate, this.totalDiscount, this.userId, this.id, this.image, this.name, this.QuantityAvailable).subscribe((response : any) => {
  //     if(response['status'] == 'success'){
  //       alert('Item Updated!');
  //       this.route.navigate(['/login/cart']);
  //     }
  //   })
  // }

}
