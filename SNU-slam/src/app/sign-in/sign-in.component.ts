import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private signInForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  isLoggedIn: boolean;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private location: Location,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.signInForm = formBuilder.group({
      email: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    });
    this.email = this.signInForm.controls['email'];
    this.password = this.signInForm.controls['password'];
  }

  ngOnInit() { }

  sign_in() {
    this.userService.login(this.email.value, this.password.value).subscribe(user => {
      if (user.id > 0) {
        console.log(user);
        this.isLoggedIn = true;
        this.userService.isLoggedIn = true;
        this.userService.current_user = user;
        alert('Sign in success');
        this.router.navigate(['/room']);
      } else {
        alert('Sign in failed');
      }
    });
    this.isLoggedIn = this.userService.isLoggedIn;
  }

  sign_out() {
    this.userService.logout().subscribe();
    this.isLoggedIn = this.userService.isLoggedIn;
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  goBack() {
    this.location.back();
  }

}
