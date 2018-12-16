import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  room_host: number;
  redTeam: User[];
  blueTeam: User[];

  constructor() { }

  setTeam(red: User[], blue: User[]) {
    this.redTeam = red;
    this.blueTeam = blue;
  }

  setHost(host: number) {
    this.room_host = host;
  }

  getRedTeam() {
    return this.redTeam;
  }

  getBlueTeam() {
    return this.blueTeam;
  }

  getRoomHost() {
    return this.room_host;
  }
}
