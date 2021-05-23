import { Component, OnInit } from '@angular/core';
import { EditProfileService } from '../edit-profile/edit-profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  username = '';
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  password: string;
  id = 0;
  image: File;
  imageData: string;

  constructor(
    private service: EditProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadUserDetailsById();
  }

  loadUserDetailsById(){

    // this.id = this.activatedRoute.snapshot.params['id'];
    this.id = localStorage['id'];
    console.log(this.id);

    this.service.getUserDetailsById((this.id).toString()).subscribe((response: any) => {
      if(response['status'] == 'success'){
        this.username = response['data'].username;
        this.firstname = response['data'].firstname;
        this.lastname = response['data'].lastname;
        this.phoneno = response['data'].phoneno;
        this.email = response['data'].email;
        this.password = response['data'].password;
      }else{
        console.log(response['error']);
        alert('error');
      }
    })
  }

  onUpdate(){

    // this.id = this.activatedRoute.snapshot.params['id'];
    this.id = localStorage['id'];

    this.service.updateUserDetails((this.id).toString(), this.username, this.firstname, this.lastname, this.phoneno, this.email, this.password, this.image).subscribe((response: any) => {
      if(response['status'] == 'success'){
        alert('Profile Updated!');
        //this.router.navigate(['/login/myprofile/this.id']);
      }else{
        console.log(response['error']);
        alert('error');
      }
    });
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

}
