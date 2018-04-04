import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from 'app/control/settings/settings.service';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-chatws',
  templateUrl: './chatws.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chatws.component.scss']
})
export class ChatWsComponent implements OnInit {

  private chatOff: boolean;
  private menuOpened: boolean;
  private messagesToAdd: string;
  private message: string;
  private zone: NgZone;


  // Stream of messages
  private subscription: Subscription;
  public messages: Observable<Message>;

  // Subscription status
  public subscribed: boolean;


  constructor(private http: Http, private _stompService: StompService) {
    this.message = '';
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.chatOff = true;
  }

  ngOnInit() {

    this.menuOpened = false;
    this.messagesToAdd = '';

    this.connect();

    // Realiza handshake com options (SSE - Server Side Event)
    // const eventSource = new EventSource(SettingsService.API_URL + '/messagings', SettingsService.getHeaderOptions());

    // Realiza handshake sem options (SSE - Server Side Event)
    // const eventSource = new EventSource(SettingsService.API_URL + '/messagings');
    // eventSource.addEventListener('message-created', (event) => this.messageReceivedFromWebSocket(event.data));
  }


  toggleMessagingBox() {
    this.menuOpened = !this.menuOpened;
  }

  chatInputColorStyle() {
    return {
      'background-color': this.chatOff ? '#EBEBE4' : '#FFF',
      'border-color': this.chatOff ? '#EBEBE4' : '#FFF'
    }
  }

  placeHolderText(): string {
    return this.chatOff ? 'Chat inativo...' : 'Escreva algo...'
  }

  setConnection() {
    console.log('chatOff inside: ' + this.chatOff);
    this.chatOff = false;
  }

  
  
  
  
  
  
  
  
  connect() {
    this.subscribed = false;

    // Store local reference to Observable
    // for use with template ( | async )
    this.subscribe();
  }

  public subscribe() {
    if (this.subscribed) {
      return;
    }

    // Stream of messages
    this.messages = this._stompService.subscribe('/topic/questions');

    // Subscribe a function to be run on_next message
    this.subscription = this.messages.subscribe(this.on_next);

    this.subscribed = true;
    this.chatOff = false;
  }

  public on_next = (message: Message) => {
    // Log it to the console
    console.log(message);
  }

  sendMessage(iptMessage: any) {
    this.message = iptMessage.value;

    if (this.message !== null && this.message.length > 0) {
      this._stompService.publish('/app/questions', this.message, {});
      iptMessage.value = '';
    }
  }

  // response
  public response = (data) => {
    console.log('received:' + data)
  }

}
