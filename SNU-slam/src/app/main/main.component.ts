import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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
    this.router.navigate(['/rooms']);
  }

  court1() {
    alert("기숙사 운동장\n코트 2개\n샤워장 있음");
  }

  court2() {
    alert("대운동장\n코트 2개\n샤워장 없음");
  }

  court3() {
    alert("301동 주차장\n코트4개\n샤워장 없음");
  }

}
