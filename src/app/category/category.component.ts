import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any[];
  id: string;

  constructor(
    private router: Router,
    private service: CategoryService,
  ) { }

  ngOnInit(): void {
    this.loadAllCategory();
  }

  loadAllCategory(){
    this.service.getCategory().subscribe((response : any) => {
      if(response['status'] == 'success'){
        this.categories = response['data'];
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  onAddCategory(){
    this.router.navigate(['/adminlogin/dashboard/category/addcategory']);
  }

  ondelete(id: string){
    this.service.deleteCategory(id).subscribe((response: any) => {
      if(response['status'] == 'success'){
        this.loadAllCategory();
      }else{
        console.log(response['error']);
        alert("error");
      }
    })
  }

  onSelect(id: string){
    this.router.navigate(['/adminlogin/dashboard/category/edit-category/' + id]);
  }

}
