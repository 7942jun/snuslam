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
    if (!this.newUser.email || !this.newUser.password || !this.newUser.nickname) {
      return;
    }
    if (this.newUser.password != this.pw_confirm) {
      alert("password is not confirmed");
      this.pw_confirm = '';
      this.newUser.password = '';
      return;
    }
    this.userService.postUser(this.newUser);
    this.goBack();
    alert("Sign up success!");
  }

  goBack() {
    this.location.back();
  }

}
