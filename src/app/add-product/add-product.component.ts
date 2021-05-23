import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductService } from './add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  cat: any[];
  categoryId = '';
  imageData: string;

  productId: number = Math.floor((Math.random() * 100) + 1);
  name: string;
  price: string;
  discount: string
  priceWithDiscount: string;
  mgfdate: string
  description: string
  image: File;
  QuantityAvailable: string;

  constructor(
    private router: Router,
    private service: AddProductService,
  ) { }

  back() {
    this.router.navigate(['/login/dashboard/product'])
  }
  addProduct() {
    this.service.addService(this.productId, this.name, this.price, this.discount, this.priceWithDiscount,
      this.mgfdate, this.description, this.image, this.categoryId, this.QuantityAvailable
    ).subscribe((response: any) => {
      if (response['status'] == 'success') {
        alert('added product')
        this.router.navigate(['/adminlogin/dashboard/product']);
      }
      else {
        console.log(response['error'])
        alert('error');
      }
    })
  }



  ngOnInit() {
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

  onSelectImage(event: any) {
    this.image = event.target.files[0];
    // this.image = event.target.files[0]
    const allowedMimeTypes = ["image/png", "image/jepg", "image/jpg"];
    if(this.image && allowedMimeTypes.includes(this.image.type)){
      const reader = new FileReader();
      reader.onload = () =>{
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(this.image);
    }
    //console.log(this.image.name);
  }

  // compareFn(a: any, b: any){
  //   console.log(a, b, a && b && a.id == b.id);
  //   return a && b && a.id == b.id;
  // }

}
