import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { EditCartProductService } from '../edit-cart-product/edit-cart-product.service';
import { EditProductService } from '../edit-product/edit-product.service';
import { ProductDetailsService } from '../product-details/product-details.service';
import { PlaceorderService } from './placeorder.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  fullname = '';
  phoneno = '';
  OrderDate: string;
  deliveryDate: string;
  PaymentMode = 1;
  state = '';
  city = '';
  pincode: String = '';
  address = '';
  cartProducts: any[];
  userId = localStorage['id'];
  Product: any;
  addressOfuser = '';
  userName = '';
  userPhoneno = '';

  name: string;
  image: File;
  priceWithDiscount: any;
  discount: any;

  constructor(
    private service: PlaceorderService,
    private route: Router,
    private cartservice: CartService,
    private editCartservice: EditCartProductService,
    private productdetailservice: ProductDetailsService,
    private editproductservice: EditProductService,
  ) { }


  ngOnInit(): void {
  }

  onadd() {
    const phoneno1: String = String(this.phoneno);
    const pincode1: String = String(this.pincode);
    if (this.fullname.length == 0) {
      alert('fullname can not be empty')
    }
    else if (phoneno1.length == 0 || phoneno1.length != 10) {
      alert('phone no is empty or not a 10 digits')
    }
    else if (this.OrderDate.length == 0) {
      alert('OrderDate is invaild')
    }
    else if (this.deliveryDate.length == 0) {
      alert('DeliveryDate is invaild')
    }
    else if (this.state.length == 0) {
      alert('state can not be empty')
    }
    else if (this.city.length == 0) {
      alert('city can not be empty')
    }
    else if (pincode1.length == 0 || pincode1.length != 6) {
      alert('invaid pincode')
    }
    else if (this.address.length == 0) {
      alert('Adress can not be empty')
    }
    else {

     

      if(confirm('Are you sure? Once Ordered can not be canceled')){

        this.addressOfuser = this.address + ', ' + this.city + ', ' + this.state + ', ' + this.pincode;
        this.userName = this.fullname;
        this.userPhoneno = this.phoneno;

        this.service.InsertLocation(this.fullname, this.phoneno,this.state,this.city,this.pincode,this.address, this.userId).subscribe((response: any) => {
          if(response['status'] == 'success'){
            console.log('Location Added!');
          }else{
            console.log(response['error']);
            alert('error');
          }
        });

        // get from Cart
    
        this.cartservice.getCart(this.userId).subscribe((response: any) => {
            if(response['status'] == 'success'){
              this.cartProducts = response['data'];

              for(let i = 0;i < this.cartProducts.length; i++){
                this.productdetailservice.getProduct(this.cartProducts[i].productId).subscribe((response: any) =>{
                  if(response['status'] == 'success'){
                      this.Product = response['data'];

                      let qty =  parseInt(this.Product.QuantityAvailable) - parseInt(this.cartProducts[i].Quantity);
                      console.log(qty.toString());
                      
                      if(this.cartProducts[i].Quantity == 0){
                        
                      }else{
                        this.update((this.Product.productId).toString(), this.Product.name, this.Product.price, this.Product.discount, this.Product.priceWithDiscount, this.Product.mgfdate,
                        this.Product.description,this.Product.categoryId, this.Product.image, qty.toString());
                        this.orderPlaced(this.userId, this.Product.name, this.cartProducts[i].Quantity, this.Product.priceWithDiscount * this.cartProducts[i].Quantity, this.Product.discount * this.cartProducts[i].Quantity, this.Product.image, this.OrderDate,this.deliveryDate,this.PaymentMode,this.addressOfuser,this.userPhoneno);
                        this.deletefromCart(this.cartProducts[i].userId, this.cartProducts[i].productId);
                      }
                      
                    }else{
                    console.log(response['error']);
                    alert('error');
                  }
                })
                
                
              }

              this.route.navigate(['/home']);

            }else{
              console.log(response['error']);
              alert('error');
            }
        })
        
      }
    }
  }


  orderPlaced(userId: any, name: any, Quantity: any, totalAmount: any, totalDiscount: any, image: File, OrderDate: any, deliveryDate: any, PaymentMode: any, addressOfuser: any,userPhoneno: any){
    this.service.orderPlaced(userId, name, Quantity, totalAmount, totalDiscount, image, OrderDate, deliveryDate, PaymentMode, addressOfuser,userPhoneno).subscribe((response: any) => {
      if(response['status'] == 'success'){
        console.log('Added in my order in server!');
      }else{
        console.log(response['error']);
          alert('error');
      }
    })
  }

  deletefromCart(userId: any, productId: any){
    this.editCartservice.deleteFromCart(userId, productId).subscribe((response: any) => {
      if(response['status'] == 'success'){
        console.log('Deleteing from Cart!');
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }

  update(productId: any, name: string, price: any, discount: any, priceWithDiscount: any, mgfdate: any, description: any, categoryId: any, image: File, QuantityAvailable: string){
    this.editproductservice.editProduct(productId, name, price, discount, priceWithDiscount, mgfdate, description, categoryId, image, QuantityAvailable).subscribe((response: any) => {
      if(response['status'] == 'success'){
        console.log("success");
      }else{
        console.log(response['error']);
        alert("error");
      }
    })
  }

}
