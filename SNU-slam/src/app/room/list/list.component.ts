import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';
import { WebsocketService } from '../websocket.service';
import { User } from '../../user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ WebsocketService, ListService ]
})
export class ListComponent implements OnInit {

  redteam: User[] = [];
  blueteam: User[] = [];
  currentUser: User;

  private user = {
    id: 0,
    team: 0,
    getOut: false
  }

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private route: ActivatedRoute,
    private listService: ListService
  ) {
    listService.users.subscribe(user => {
      this.blueteam = this.blueteam.filter(temp => temp.id !== user.id);
      this.redteam = this.redteam.filter(temp => temp.id !== user.id);
      if(!user.getOut) {
        if(user.team === 1) {
          this.userService.getUserById(user.id).subscribe(user => this.redteam.push(user));
        }
        else if(user.team === 2) {
          this.userService.getUserById(user.id).subscribe(user => this.blueteam.push(user));
        }
      }
		});
  }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    this.getUserlist();
  }

  setCurrentUserTeam(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.AddRoomUser(id, this.currentUser.id).subscribe();
    this.currentUser.team = 1;
    this.roomService.changeTeam(this.currentUser).subscribe();
    this.user.id = this.currentUser.id;
    this.user.team = 1;
    this.user.getOut = false;
    this.listService.users.next(this.user);
  }

  getUserlist(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomUserById(id).subscribe(
      users => {
        this.redteam  = users.filter( user => user.team === 1 || user.team === 0);
        this.blueteam = users.filter( user => user.team === 2);
        this.setCurrentUserTeam();
      }
    );
  }

  onChangeTeam(): void {
    if(this.currentUser.team === 1) {
      this.currentUser.team = 2;
      this.roomService.changeTeam(this.currentUser).subscribe();
      this.user.id = this.currentUser.id;
      this.user.team = 2;
      this.user.getOut = false;
      this.listService.users.next(this.user);
    }
    else if(this.currentUser.team === 2) {
      this.currentUser.team = 1;
      this.roomService.changeTeam(this.currentUser).subscribe();
      this.user.id = this.currentUser.id;
      this.user.team = 1;
      this.user.getOut = false;
      this.listService.users.next(this.user);
    }
  }
}
