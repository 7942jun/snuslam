import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../user';
import { Room } from '../../room';
import { RoomService } from '../room.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ListService } from '../list.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
  providers: [ WebsocketService, ListService ]
})
export class RoomDetailComponent implements OnInit {
  user: User;
  room: Room;
  users: User[];
  redteam: User[];
  blueteam: User[];
  play_time: number;
  host_id: number;
  isStarted: boolean;


  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.getRoom();
    //this.getUserlist();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomById(id).subscribe(
      room => {
        this.room = room;
        this.host_id = room.host;
        this.isStarted = room.ingame;
        this.play_time = room.play_time;
      }
    );
  }

  // getUserlist(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.roomService.getRoomUserById(id).subscribe(
  //     users => {
  //       this.users = users;
  //       this.redteam  = users.filter( user => user.team === 1);
  //       this.blueteam = users.filter( user => user.team === 2);
  //       this.onChangeTeam();
  //     }
  //   );
  // }

  // refreshUserlist(): void {
  //   const id = this.room.id;
  //   this.roomService.getRoomUserById(id).subscribe(
  //     users => {
  //       this.users = users;
  //       this.redteam  = users.filter( user => user.team === 1);
  //       this.blueteam = users.filter( user => user.team === 2);
  //     }
  //   );
  // }

  // refresh(): void {
  //   this.getRoom();
  //   this.refreshUserlist();
  //   console.log('ff');
  // }


  onFinished(team: any) {
    if ( team == null ) {

    }
    else {
      this.roomService.deleteRoomById(this.room.id).subscribe(
        () => this.router.navigate(['/room'])
        );
      }
  }


  // onChangeTeam() {
  //   this.refresh();
  //   if (this.isStarted) {
  //     alert('Game is started! You cannot change your team');
  //   }
  //   else {
  //     if (this.user.team !== 0) {
  //       if (this.user.team === 1) {
  //         this.user.team = 2;
  //       } else {
  //         this.user.team = 1;
  //       }
  //     } else {
  //       if ( this.redteam.length > this.blueteam.length ) {
  //         this.user.team = 2;
  //       } else {
  //         this.user.team = 1;
  //       }
  //     }
  //
  //     this.roomService.changeTeam(this.user).subscribe(
  //       () => this.refresh()
  //     );
  //   }
  // }

  start() {
    //this.refresh();
    // if ( this.redteam.length === this.blueteam.length ) {
    //   const newroom = this.room;
    //   newroom.ingame = true;
    //   this.roomService.updateRoom(newroom).subscribe(
    //     //() => this.refresh()
    //   );
    // } else {
    //   alert( 'Numbers of people in the two teams is not equal!');
    // }
  }

  goBack() {
    //this.refresh();
    const check = confirm('Do you want to leave the room?');
    if (check) {
      // if (this.isStarted) {
      //   alert( 'Game started! You are not allowed to leave the room!' );
      // }
      if (this.user.id === this.host_id) {
        alert('Room host cannot go back');
      } else {
        this.roomService.deleteRoomUser(this.room.id, this.user.id).subscribe();
        const user = {id:this.user.id, team:0, getOut:true};
        this.listService.users.next(user);
        this.router.navigate(['/room'])
      }
      //   this.roomService.updateRoom( newroom ).subscribe(
      //     () => this.router.navigate(['/room'])
      //   );
      // }
      // else {
      // this.roomService.deleteRoomById(this.room.id).subscribe(
      //   () => this.router.navigate(['/room'])
      //   );
      // }
    }
  }
}
