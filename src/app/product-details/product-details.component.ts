import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  count: number;
  rate: number;
  temp: number;
  productId: number;
  totalDiscount: number;
  userId: number;
  image: File;
  name: string;
  QuantityAvailable: string;

  constructor(
    private service: ProductDetailsService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cartservice: CartService,
  ) { }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails() {
    this.productId = this.activateRoute.snapshot.params['productId'];
    console.log(this.productId);

    if (this.productId) {
      this.service.getProduct(this.productId).subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.product = response['data'];
          this.rate = this.product.priceWithDiscount;
          this.temp = this.rate;
          this.image = this.product.image;
          this.name = this.product.name;
          this.QuantityAvailable = this.product.QuantityAvailable;
          if(this.QuantityAvailable == "0"){
            this.count = 0;
          }else{
            this.count = 1;
          }
          console.log(this.QuantityAvailable);
        }
      });
    }
  }

  OnIncrement() {
    
    if(this.QuantityAvailable <= this.count.toString()){
      alert("You can't increment more!");
    }else{
      this.count += 1;
      this.rate = this.temp * this.count;
    }
    
  }

  OnDecrement() {
    if (this.count == 1) {
      alert('Can not decrement');
    } else {
      this.count -= 1;
      this.rate = this.temp * this.count;
    }
  }

  onAddToCart() {
    if (localStorage['login_status'] == '0') {
      alert('You need to Login First');
      this.router.navigate(['/login']);
    } else {
      if (confirm('Do you want to add items')) {
        this.userId = localStorage['id'];
        this.productId = this.activateRoute.snapshot.params['productId'];
        console.log(this.userId);
        console.log(this.productId);
        this.totalDiscount = (this.product.price * this.count) - this.rate;

        this.cartservice.getCart(this.userId).subscribe((response: any) => {
          if (response['status'] == 'success') {
            let products: any[];
            products = response['data'];
            let productExist = false;

            for (let i = 0; i < products.length; i++) {
              if (products[i].productId == this.productId) {
                productExist = true;
                this.updateInCart();
              }
            }

            if (!productExist) {
              this.postInCart();
            }

          }
        })

      }
    }
  }

  updateInCart() {
    this.service.updateProductInCart(this.count, this.userId, this.productId).subscribe((response: any) => {
      if (response['status'] == 'success') {
        alert('items added in your cart');
        window.location.reload();
      }
    })
  }

  postInCart() {
    this.cartservice.postInCart(this.count, this.userId, this.productId).subscribe((response: any) => {
      if (response['status'] == 'success') {
        alert('items added in your cart');
        window.location.reload();
      }
    })
  }

  OnBack() {

    this.router.navigate(['/home'])
    // if(localStorage['onBack'] == 'allopathic'){
    //     this.router.navigate(['/MRlogin/allopathic'])
    // }
    // else if(localStorage['onBack'] == 'ayurvedic'){
    //     this.router.navigate(['/MRlogin/ayurvedic'])
    // }
    // else if(localStorage['onBack'] == 'homo'){
    //     this.router.navigate(['/MRlogin/homoeopathy'])
    // }
    // else if(localStorage['onBack'] == 'searchProduct'){
    //     this.router.navigate(['/MRlogin/search'])
    // }
    // else{
    //     this.router.navigate(['/MRlogin/home'])
    // }

  }

}
