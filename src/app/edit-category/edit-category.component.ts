import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCategoryService } from './edit-category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  id: string;
  title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: EditCategoryService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(){

    this.id = this.activatedRoute.snapshot.params['id'];

    this.service.getCategoryDetails(this.id).subscribe((response: any) => {
      if(response['status'] == 'success'){
        this.id = response['data'].id;
        this.title = response['data'].title;
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }

  onUpdate(){

    this.id = this.activatedRoute.snapshot.params['id'];

    this.service.editCategory((this.id).toString(), this.title).subscribe((response: any) => {
      if(response['status'] == 'success'){
          alert('Category Updated!');
          this.route.navigate(['/adminlogin/dashboard/category']);
      }else{
        console.log(response['error']);
        alert('error');
      }
    });
  }

}
