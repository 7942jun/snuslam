import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  sign_in() {
    this.router.navigate(['/rooms']).then();
  }

}
