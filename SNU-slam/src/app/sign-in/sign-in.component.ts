import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    email: new FormControl('',[ Validators.required ]),
    password: new FormControl('')
  });

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  sign_in() {
    this.authService.login();
    this.router.navigate(['room']);
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

}
