import { Component, OnInit, Input } from '@angular/core';
import { ChatResponseModel } from '../../../../model/entity/chat-response.model';

@Component({
  selector: 'app-chatws-text',
  templateUrl: './chatws-text.component.html',
  styleUrls: ['./chatws-text.component.scss']
})
export class ChatwsTextComponent implements OnInit {

  @Input() isFromOtherUser: boolean;
  @Input() userUrlPicture: string;
  @Input() userName: string;
  @Input() message: string;

  constructor() { }

  ngOnInit() {
    if (!this.userUrlPicture) {
      this.userUrlPicture = this.isFromOtherUser ? 'assets/default_chat_picture_2.jpg' : 'assets/default_chat_picture_1.jpg';
    }
  }

  private textPosition(): string {
    return this.isFromOtherUser ? 'left-chat' : 'right-chat';
  }

}
