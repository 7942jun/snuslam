import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room } from '../room';
import { User } from '../user';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl = environment.API_URL;
  private url = this.baseUrl + '/api/room';

  constructor(
     private http: HttpClient
    ) { }

  getAllRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }  // tested
  getRoomById(id: number): Observable<Room> {
    const url = `${this.url}/${id}`;
    return this.http.get<Room>(url);
  }  // tested
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.url, room, httpOptions);
  }  // tested
  deleteRoomById(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }  // tested
  updateRoom(room: Room ): Observable<void> {
    const url = `${this.url}/${room.id}`;
    return this.http.put<void>(url, room, httpOptions);
  } // tested
  getRoomUserById(roomid: number): Observable<User[]> {
    const url = `${this.url}/${roomid}/user`;  // mock
    return this.http.get<User[]>(url);
  }
  AddRoomUser(roomid: number, userid: number): Observable<void> {
    const url = `${this.url}/${roomid}/user`;
    const data = JSON.stringify({ user: userid });
    return this.http.put<void>(url, data, httpOptions);
  }
  deleteRoomUser(roomid: number, userid: number): Observable<void> {
    const url = `${this.url}/${roomid}/user/${userid}`;
    return this.http.delete<void>(url);
  }
  changeTeam( user: User ): Observable<void> {
    const url = `${this.url}/${user.id}`;
    return this.http.put<void>(url, user, httpOptions);
  }



}
