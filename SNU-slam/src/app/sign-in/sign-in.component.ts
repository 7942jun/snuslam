import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private signInForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private location: Location,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.signInForm = formBuilder.group({
      email: new FormControl('',[ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    });
    this.email = this.signInForm.controls['email'];
    this.password = this.signInForm.controls['password'];
  }

  ngOnInit() {
  }

  sign_in() {
    this.authService.login(this.email.value, this.password.value).subscribe(user => {
      if (user != undefined) {
        this.authService.current_user = user;
        this.authService.isLoggedIn = true;
      }
    });
    this.router.navigate(['room']);
  }

  sign_out() {
    this.authService.logout();
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  goBack() {
    this.location.back();
  }

}
