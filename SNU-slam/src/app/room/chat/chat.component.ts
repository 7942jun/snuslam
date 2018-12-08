import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ChatService } from '../chat.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class ChatComponent implements OnInit {

  input: string;
  chatLog: string;

  private message = {
		username: '',
		message: ''
	}

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {
		chatService.messages.subscribe(msg => {
      //console.log( msg.author + " " + msg.message);
      this.chatLog += msg.username + ': ' + msg.message + '\n';
		});
	}

  ngOnInit() {
    this.chatLog = '';
  }

  sendMsg() {
    this.message.message = this.input;
    this.message.username = this.userService.current_user.username;
		//console.log('new message from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
		this.input = '';
	}
}
