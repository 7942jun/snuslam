import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserService } from "../services/user.service";
import { User } from "../user";

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  users: User[];
  searched_users: User[];

  constructor(private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users.slice(0,10));
  }

  search(term: string) {
    this.userService.searchUsers(term).subscribe(users => this.searched_users = users.slice(0, 10));
  }

  goBack() {
    this.location.back();
  }

}
