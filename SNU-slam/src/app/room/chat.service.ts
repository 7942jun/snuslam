import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';

const CHAT_URL = 'ws://127.0.0.1:8000/ws/chat/something/';

export class Message {
	username: string,
	message: string
}

@Injectable(	)
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(CHAT_URL)
      .pipe(map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          username: data.username,
          message: data.message
        }
      }));
  }
}
