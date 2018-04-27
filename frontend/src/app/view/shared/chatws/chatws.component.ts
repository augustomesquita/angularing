import { Component, OnInit, NgZone, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from 'app/control/settings/settings.service';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription, Observable } from 'rxjs/Rx';
import { NotificationsService } from 'angular2-notifications';
import { MessageModel } from './../../../model/entity/message.model';

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
  private subscriptionMessages: Subscription;
  private subscriptionPrivateMessages: Subscription;

  public messages: Observable<Message>;
  public privateMessages: Observable<Message>;

  // Subscription status
  public subscribed: boolean;


  constructor(private http: Http, private stompService: StompService, private notificationService: NotificationsService) {
    this.message = '';
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.chatOff = true;
  }

  ngOnInit() {

    this.menuOpened = false;
    this.messagesToAdd = '';

    // Realiza conexão
    this.connect();

    // Se inscreve em um Behavior Subject responsável por indiciar o stado da conexão.
    // Por se tratar de um Behavio Subject, qualquer alteração que este objeto sofrer
    // nosso código será notificado, pelo fato de estarmos inscritos nele (para receber
    // o valor de forma assíncrona) caso queira receber o valor de forma síncrona, basta
    // chamar o método 'getValue()' ao invéz de 'subscribe'.
    this.stompService.state.subscribe((state) => {
      if (state > 0) {
        this.chatOff = false;
      } else {
        this.chatOff = true;
      }
    });

    // Realiza handshake com options (SSE - Server Side Event) | Não está sendo usado no momento pela aplicação
    // const eventSource = new EventSource(SettingsService.API_URL + '/messagings', SettingsService.getHeaderOptions());

    // Realiza handshake sem options (SSE - Server Side Event) | Não está sendo usado no momento pela aplicação
    // const eventSource = new EventSource(SettingsService.API_URL + '/messagings');
    // eventSource.addEventListener('message-created', (event) => this.messageReceivedFromWebSocket(event.data));
  }

  ngOnDestroy(): void {
    this.subscriptionMessages.unsubscribe();
    this.subscriptionPrivateMessages.unsubscribe();
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

  placeHolderTextAll(): string {
    return this.chatOff ? 'Chat inativo...' : 'Escreva algo para todos...'
  }

  placeHolderTextPrivate(): string {
    return this.chatOff ? 'Chat inativo...' : 'Chame a atenção de um usuário...'
  }

  // Websocket rotinas
  connect() {
    // Passa inscrição como falsa
    this.subscribed = false;

    // Store local reference to Observable
    // for use with template ( | async )
    this.subscribe();
  }

  public subscribe() {
    if (this.subscribed) {
      return;
    }

    // Stream de mensagens que irá receber mensagens vindas do canal '/topic/ws'
    this.messages = this.stompService.subscribe('/topic/angularing-ws');

    // Stream de mensagens que irá receber mensagens vindas do canal privado '/user/queue/ws'
    this.privateMessages = this.stompService.subscribe('/user/queue/private');

    // Da Subscribe na função que é chamada ao receber mensagem.
    // Essa função por sua vez chama a função 'messageReceived'
    this.subscriptionMessages = this.messages.subscribe(this.messageReceived);

    // Da Subscribe na função que é chamada ao receber mensagem.
    // Essa função por sua vez chama a função 'messageReceived'
    this.subscriptionPrivateMessages = this.privateMessages.subscribe(this.privateMessageReceived);

    this.subscribed = true;
    this.chatOff = false;
  }

  /**
   * privateMessageReceived é uma variável que recebe uma função como valor.
   * Essa função é responsável por receber a mensagem privada vinda do websocket.
   */
  public privateMessageReceived = (message: Message) => {
    this.notificationService.error('Notificação privada recebida: ' + message.body)
  }

  /**
   * messageReceived é uma variável que recebe uma função como valor.
   * Essa função é responsável por receber a mensagem pública do websocket.
   */
  private messageReceived = (message: Message) => {
    this.zone.run(() => {
      const messageModel: MessageModel = JSON.parse(message.body) as MessageModel;
      if (messageModel != null) {
        let isFromOtherUser = false;
        if (this.message.toLowerCase() != messageModel.message.toLowerCase()) {
          isFromOtherUser = true;
        }
        this.createMessageToShow(messageModel, isFromOtherUser)
      }
    });
  }

  /**
   * Cria os elementos HTML para apresentar os dados do chat.
   * @param messageModel
   * @param isFromOtherUser
   */
  private createMessageToShow(messageModel: MessageModel, isFromOtherUser: boolean) {
    let userUrlPicture = messageModel.userUrlPicture;
    let position: string;
    if (isFromOtherUser) {
      position = 'left-chat';
      if (!userUrlPicture) {
        userUrlPicture = 'assets/default_chat_picture_2.jpg';
      }
    } else {
      position = 'right-chat';
      if (!userUrlPicture) {
        userUrlPicture = 'assets/default_chat_picture_1.jpg';
      }
    }

    this.messagesToAdd += '<li><div class="' + position + '">'
      + '<img src="' + userUrlPicture + '"><p><b>'
      + messageModel.userName + '</b>: ' + messageModel.message
      + '</p></div></li>';
  }

  /**
   * Função responsável por envia mensagens para o websocket
   * passando pelo filtro '/app/public-message', o qual transforma
   * a string em upperCase antes de enviar para todos
   * que estão cadastrados no websocket.
   * Caso você não queira enviar a mensagem para ser tratada pelo
   * @MessageMapping (prefixo da aplicação) basta mudar
   * o endereço de envio de '/app/chat' para '/topic/chat'.
   */
  sendMessageToAll(iptMsg: any) {
    this.message = iptMsg.value;
    if (this.message !== undefined && this.message !== null && this.message.length > 0) {
      this.stompService.publish('/app/public-message', this.message, {});
      iptMsg.value = '';
    }
  }

  sendMessageToUser(iptUser: any) {
    const user: string = iptUser.value;
    if (user !== undefined && user !== null && user.length > 0) {
      this.stompService.publish('/app/private-message/' + user, 'Opaaa!!!', {});
      iptUser.value = '';
    }
  }

}
