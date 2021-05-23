import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersListService } from './users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: any[];

  constructor(
    private service: UsersListService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.service.getUsers().subscribe((response: any) => {
      if(response['status'] == 'success'){
        this.users = response['data'];
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }
  onUserSelect(id: number)
  {
     this.router.navigate(['/login/dashboard/user/edit_user/'+id])
  }   

  dashboard()
    {
        this.router.navigate(['/dashboard']);
    }



}
