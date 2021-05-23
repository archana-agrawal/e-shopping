import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { AddCategoryService } from './add-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  title: string;
  id: string;
  count: string;

  constructor(
    private service: AddCategoryService,
    private router: Router,
    private categoryservice: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategorires();
  }

  addCategory(){

    // console.log(this.id);
    // console.log(this.title);
    this.id = this.count;
    this.service.postCategory(this.id, this.title).subscribe((response: any) => {
      if(response['status'] == 'success'){
        alert('Category Added!');
        this.router.navigate(['/adminlogin/dashboard/category']);
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }

  getCategorires(){
    this.categoryservice.getCategory().subscribe((response : any) => {
      if(response['status'] == 'success'){
        let categories = [];
        categories = response['data'];
        this.count = categories.length + 1;
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }

}
