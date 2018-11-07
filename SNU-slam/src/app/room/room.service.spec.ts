import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Room } from '../room';

import { RoomService } from './room.service';



const mockRoomList: Room[] = [
  { id: 1, 
    title: 'test1', 
    host_id: 1,
    guests_id: [2,3,4],
    location: '301',
    play_time: 60,
    creation_time: new Date('December 17, 1995 03:24:00') ,
    game_type: 3,
  }

]


const mockRoom: Room ={ 
id: 1, 
title: 'test1', 
host_id: 1,
guests_id: [2,3,4],
location: '301',
play_time: 60,
creation_time: new Date('December 17, 1995 03:24:00') ,
game_type: 3,
}

describe('RoomService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let roomservice: RoomService;
  const url = "api/room/";
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [RoomService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    roomservice = TestBed.get(RoomService);
  });
  it('should be created', inject([RoomService],(service:RoomService)=>{
    expect(service).toBeTruthy();

  }));

  it('should get all Rooms with get request',async(()=>{
    roomservice.getAllRoom().subscribe(
      data => {expect(data).toEqual(mockRoomList);}
    )
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRoomList);
  }))
  it('should update Rooms with put request', async(()=>{
    const roomid = mockRoom.id;
    const room_url = `${url}${roomid}/`;
    roomservice.updateRoom(mockRoom).subscribe();
    const req = httpTestingController.expectOne(room_url);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  }));

  it('should delete Room with delete request', async(()=>{
    const roomid = mockRoom.id;
    const room_url = `${url}${roomid}/`;
    roomservice.deleteRoomById(roomid).subscribe();
    const req = httpTestingController.expectOne(room_url);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  }));

  it('should get Room by id with get request', async(()=>{
    const roomid = mockRoom.id;
    const room_url = `${url}${roomid}/`;
    roomservice.getRoomById(roomid).subscribe(
      data => {expect(data).toEqual(mockRoom);}
    )
    const req = httpTestingController.expectOne(room_url);
    expect(req.request.method).toEqual('GET');
  }))

  it('should add Room with post request', async(()=>{
    roomservice.addRoom(mockRoom).subscribe(
      data => {expect(data).toEqual(mockRoom);});
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockRoom);
  }));
})









  
 