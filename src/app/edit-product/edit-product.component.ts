import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { EditProductService } from './edit-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  cat: any[];
  OutOfStockList: any[];

  productId: string;
  name: string;
  price: string;
  discount: string
  priceWithDiscount: string;
  mgfdate: string
  description: string;
  categoryId: string;
  image: File;
  QuantityAvailable: string;
  tempPrice: string;
  tempQuantityAvailable: string;
  
  // image: File

  constructor(
    private service: EditProductService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cartservice: CartService,
  ) { }

  ngOnInit(): void {
    this.loadProductDetails();
    this.loadCategories();
  }

  loadCategories() {
    this.service.getCategories().subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.cat = response['data'];
        // if(this.cat.length > 0){
        //   this.categoryId = this.cat[0].id;
        // }
      }
    })
  }

  loadProductDetails(){

    this.productId = this.activatedRoute.snapshot.params['productId'];

    this.service.getProductDetails((this.productId).toString()).subscribe((response: any) => {
      if(response['status'] == 'success'){
        const pro = response['data'];
        this.name = pro.name;
        this.tempPrice = pro.price;
        this.price = pro.price;
        this.discount = pro.discount;
        this.priceWithDiscount = pro.priceWithDiscount;
        this.mgfdate = pro.mgfdate;
        this.description = pro.description;
        this.categoryId = pro.categoryId;
        this.image = pro.image;
        this.tempQuantityAvailable = pro.QuantityAvailable;
        this.QuantityAvailable = pro.QuantityAvailable;
      }else{
        console.log(response['error']);
        alert('error');
      }
    });
  }

  onUpdate(){

    this.productId = this.activatedRoute.snapshot.params['productId'];

    this.service.editProduct((this.productId).toString(), this.name, this.price, this.discount, this.priceWithDiscount, this.mgfdate,
       this.description,this.categoryId, this.image, this.QuantityAvailable).subscribe((response: any) => {
      if(response['status'] == 'success'){
          // this.updateCart();
          alert('Product Updated!');
          this.route.navigate(['/adminlogin/dashboard/product']);
      }else{
        console.log(response['error']);
        alert('error');
      }
    });

    this.service.getOutofstock(this.productId).subscribe((response: any) => {
      if(response['status'] == 'success'){
       this.OutOfStockList = response['data'];
       for(let i = 0;i < this.OutOfStockList.length; i++){
         this.service.sendMail(this.OutOfStockList[i].userId).subscribe((response: any) =>{
           if(response['status'] == 'success'){
            console.log('Mail Sent!');
           }else{
             console.log(response['error']);
           }
         })
       }
      }else{
        console.log(response['error']);
      }
    })

  }


  // cart: any[];
  // updateCart(){
  //   this.productId = this.activatedRoute.snapshot.params['productId'];
  //   this.service.getCart(parseInt(this.productId)).subscribe((response: any) => {
  //     if(response['status'] == 'success'){
  //       this.cart = response['data'];
  //       for(let i = 0;i < this.cart.length; i++){
  //         this.cart[i].Amount = parseInt(this.price) * this.cart[i].Quantity;
  //         this.cart[i].QuantityAvailable = this.QuantityAvailable;
  //       }
  //     }else{
  //       console.log(response['error']);
  //       alert('error');
  //     }
  //   })
  // }

  // putInCart(){
  //   this.service.putincart().subscribe((response: any) => {

  //   })
  // }

}
