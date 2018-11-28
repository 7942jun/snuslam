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

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

}
