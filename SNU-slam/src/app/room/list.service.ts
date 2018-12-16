import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

export interface user {
	id: number,
	team: number,
	getOut: boolean
}

@Injectable()
export class ListService {
  public users: Subject<user>;
	baseUrl = environment.API_URL;
	CHAT_URL = 'ws://' + this.baseUrl + '/ws/room/';

  constructor(
		private wsService: WebsocketService,
		private route: ActivatedRoute
	) {
		const roomid = +this.route.snapshot.paramMap.get('id');
		this.CHAT_URL += roomid + '/';
    this.users = <Subject<user>>wsService
      .connect(this.CHAT_URL)
      .pipe(map((response: MessageEvent): user => {
        let data = JSON.parse(response.data);
        return {
          id: data.id,
          team: data.team,
					getOut: data.getOut
        }
      }));
  }
}
