import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser = new User();
  pw_confirm = '';

  constructor( private location: Location,
               private userService: UserService) { }

  ngOnInit() {
  }

  signUp() {
    var rx_email = /^[a-z0-9]+\@snu\.ac\.kr$/;
    var no_email:boolean = !(rx_email.test(this.newUser.email));
    if(no_email){
      alert("Unvalid email");
      return;
    }
    if(!this.newUser.email.trim() || !this.newUser.password.trim() || !this.newUser.username.trim() || !this.newUser.position) {
      alert("enter information");
      return;
    }
    if (this.newUser.password != this.pw_confirm) {
      alert("password is not confirmed");
      this.pw_confirm = '';
      this.newUser.password = '';
      return;
    }

    this.userService.postUser(this.newUser).subscribe(
      user => {
        if (user.id > 0) {
          this.goBack();
          alert('Sign up success!');
        }
      }, () => alert('Sign up failed!')
    );

  }

  goBack() {
    this.location.back();
  }

}
