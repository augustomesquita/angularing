import { Component, OnInit, NgZone, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from 'app/control/settings/settings.service';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription, Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-chatws',
  templateUrl: './chatws.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chatws.component.scss']
})
export class ChatWsComponent implements OnInit, OnDestroy {

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  // Websocket rotinas
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

    // Stream de mensagens que irá receber mensagens vindas do canal '/all/chat'
    this.messages = this._stompService.subscribe('/topic/chat');

    // Da Subscribe na função que é chamada ao receber mensagem.
    // Essa função por sua fez chama a função
    this.subscription = this.messages.subscribe(this.messageReceived);

    this.subscribed = true;
    this.chatOff = false;
  }

  // Função chamada ao receber mensagens
  public messageReceived = (message: Message) => {
    this.zone.run(() => {
      if (this.message != message.body.toLowerCase()) {
        this.messagesToAdd += '<li><div class="left-chat"><img src="assets/yoshi_chat.png"><p>' + message.body + '</p></div></li>'
      } else {
        this.messagesToAdd += '<li><div class="right-chat"><img src="assets/mario_chat.png"><p>' + message.body + '</p></div></li>'
      }
    });
  }

  // Função responsável por envia mensagens para o websocket
  // passando pelo filtro '/app/chat', o qual transforma
  // a string em upperCase antes de enviar para todos
  // que estão cadastrados no websocket.
  sendMessage(iptMessage: any) {
    this.message = iptMessage.value;
    if (this.message !== null && this.message.length > 0) {
      this._stompService.publish('/app/chat', this.message, {});
      iptMessage.value = '';
    }
  }

}
