import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserService } from "../services/user.service";
import { User } from "../user";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  users: User[];

  constructor(private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users.sort((a, b) => {
      return a.point > b.point ? -1 : a.point < b.point ? 1 : 0;
    }));
  }

  goBack() {
    this.location.back();
  }

}
