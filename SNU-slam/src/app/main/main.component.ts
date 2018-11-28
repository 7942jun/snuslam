import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../room/room.service';
import { AuthService } from '../auth/auth.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  rooms: Room[];
  email: string;
  password: string;

  signInForm = new FormGroup({
    email: new FormControl('',[ Validators.required ]),
    password: new FormControl('')
  });

  constructor(
    public router: Router,
    private roomService: RoomService,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getAllRoom().subscribe(rooms => this.rooms = rooms);
  }

  sign_in() {
    this.authService.login();
    this.router.navigate(['room']);
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

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

}
