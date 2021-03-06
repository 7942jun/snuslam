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
  chatLog: string[];

  private message = {
		username: '',
		message: ''
	}

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {
		chatService.messages.subscribe(msg => {
      this.chatLog.push(msg.username + ': ' + msg.message);
		});
	}

  ngOnInit() {
    this.chatLog = [];
  }

  sendMsg() {
    if(this.input.trim().length == 0){
      return;
    }
    this.message.message = this.input;
    this.message.username = this.userService.current_user.username;
		this.chatService.messages.next(this.message);
		this.input = '';
  }
  
  enterSend(event){
    if(event.keyCode == 13){
      this.sendMsg();  // 실행할 이벤트
    }
  }

}
