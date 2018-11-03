import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser = new User();
  pw_confirm = '';

  @Output()
  add: EventEmitter<User> = new EventEmitter();

  constructor(private location: Location) { }

  ngOnInit() {
  }

  addUser() {
    if (!this.newUser.email || !this.newUser.password || !this.newUser.nickname) {
      return;
    }
    if (this.newUser.password != this.pw_confirm) {
      alert("password is not confirmed");
      this.pw_confirm = '';
      this.newUser.password = '';
      return;
    }
    this.add.emit(this.newUser);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

}
