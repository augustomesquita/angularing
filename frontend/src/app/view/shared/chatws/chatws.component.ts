import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Http } from '@angular/http';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { NotificationsService } from 'angular2-notifications';
import { Observable, Subscription } from 'rxjs/Rx';

import { EventConstant } from './../../../model/constant/event.constant';
import { BaseMessageModel } from './../../../model/entity/base-message.model';
import { ChatResponseModel } from './../../../model/entity/chat-response.model';
import { TypingResponseModel } from './../../../model/entity/typing-response.model';

@Component({
  selector: 'app-chatws',
  templateUrl: './chatws.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chatws.component.scss']
})
export class ChatWsComponent implements OnInit, OnDestroy {

  @ViewChild('chatContainer') private chatContainer: ElementRef;
  private chatOff: boolean;
  private chatBoxOpened: boolean;
  private chatHeadTextInfo: string;
  private chatHeadTextInfoTyping: boolean;

  private allMessagesForChatHTML: string;
  private lastMessageOfLoggedUser: string;
  private zone: NgZone;


  // Subscriptions
  private subscriptionMessages: Subscription;
  private subscriptionPrivateMessages: Subscription;

  // Observables
  public messages: Observable<Message>;
  public privateMessages: Observable<Message>;

  // Status de inscrição
  public subscribedStatus: boolean;

  constructor(
    private http: Http, private stompService: StompService,
    private notificationService: NotificationsService, private cd: ChangeDetectorRef
  ) {
    this.lastMessageOfLoggedUser = '';
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.chatOff = true;
    this.chatHeadTextInfoTyping = true;
  }

  ngOnInit() {
    // Define que o chat inicia fechado.
    this.chatBoxOpened = false;

    // Define que as conversas iniciam vazias.
    this.allMessagesForChatHTML = '';

    // Realiza conexão websocket
    this.connect();

    // Se inscreve em um Behavior Subject responsável por indicar o stado da conexão.
    // Por se tratar de um Behavior Subject, qualquer alteração que este objeto sofrer
    // nosso código será notificado, pelo fato de estarmos inscritos nele (para receber
    // o valor de forma assíncrona). Caso queira receber o valor de forma síncrona, basta
    // chamar o método 'getValue()' ao invéz de 'subscribe'. state == 0 (off) state == 1 (on)
    this.stompService.state.subscribe((state) => {
      if (state > 0) {
        this.chatOff = false;
      } else {
        this.chatOff = true;
        this.chatHeadTextInfo = 'Chat inativo... Tente mais tarde.'
      }
    });
  }

  // Anula as inscrições realizadas
  ngOnDestroy(): void {
    this.subscriptionMessages.unsubscribe();
    this.subscriptionPrivateMessages.unsubscribe();
  }

  /**
   * Abre / fecha chat.
   */
  toggleChatBox() {
    this.chatBoxOpened = !this.chatBoxOpened;
  }

  /**
   * Desfine estilos para inputs de texto do chat
   * para quando o mesmo está ativado / desativado.
   */
  chatInputColorStyle() {
    return {
      'background-color': this.chatOff ? '#EBEBE4' : '#FFF',
      'border-color': this.chatOff ? '#EBEBE4' : '#FFF'
    }
  }

  /**
   * Define placeholders para inputs de texto para todos do chat
   * para quando o mesmo está ativado / desativado.
   */
  placeHolderTextAll(): string {
    return this.chatOff ? 'Chat inativo...' : 'Escreva algo para todos...'
  }

  /**
   * Define placeholders para inputs de texto de notificação privada do chat
   * para quando mesmo está ativado / desativado.
   */
  placeHolderTextPrivate(): string {
    return this.chatOff ? 'Chat inativo...' : 'Chame a atenção de um usuário...'
  }

  /**
   * Realiza conexão websocket caso ainda não tenha sido feita.
   */
  connect() {
    // Passa inscrição como falsa
    this.subscribedStatus = false;
    this.subscribe();
  }

  public subscribe() {
    // Caso websocket socket já esteja aberto, retorna.
    if (this.subscribedStatus) {
      return;
    }

    // Stream de mensagens que irá receber dados vindo do canal '/topic/ws'
    this.messages = this.stompService.subscribe('/topic/angularing-ws');

    // Stream de mensagens que irá receber dados vindo do canal privado '/user/queue/ws'
    this.privateMessages = this.stompService.subscribe('/user/queue/private');

    // Da Subscribe na função que é chamada ao receber mensagem.
    // Essa função por sua vez chama a função 'messageReceived'
    this.subscriptionMessages = this.messages.subscribe(this.messageReceived);

    // Da Subscribe na função que é chamada ao receber mensagem.
    // Essa função por sua vez chama a função 'messageReceived'
    this.subscriptionPrivateMessages = this.privateMessages.subscribe(this.privateMessageReceived);

    this.subscribedStatus = true;
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
      const responseModel: BaseMessageModel = JSON.parse(message.body) as BaseMessageModel;

      if (responseModel.event == EventConstant.CHAT) {
        const messageModel: ChatResponseModel = JSON.parse(message.body) as ChatResponseModel;

        if (messageModel != null) {
          let isFromOtherUser = false;
          if (this.lastMessageOfLoggedUser.toLowerCase() != messageModel.message.toLowerCase()) {
            isFromOtherUser = true;
          }
          this.allMessagesForChatHTML += this.createHtmlChatMessage(messageModel, isFromOtherUser);
          this.cd.detectChanges();
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }
      } else {
        const typingModel: TypingResponseModel = JSON.parse(message.body) as TypingResponseModel;

        if (this.chatHeadTextInfoTyping) {
          if (this.chatHeadTextInfo != typingModel.message) {
            this.chatHeadTextInfo = typingModel.message;
          }
          setTimeout(() => { this.chatHeadTextInfo = ''; this.chatHeadTextInfoTyping = true }, 3000);
        }
        this.chatHeadTextInfoTyping = false;
      }
    });
  }

  /**
   * Cria os elementos HTML necessários para apresentar a mensagem no chat.
   * @param messageModel
   * @param isFromOtherUser
   * @returns // mensagem html formatada para ser usada no chat.
   */
  private createHtmlChatMessage(messageModel: ChatResponseModel, isFromOtherUser: boolean): string {
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

    return '<li><div class="' + position + '">'
      + '<img src="' + userUrlPicture + '"><p><b>'
      + messageModel.userName + '</b>: ' + messageModel.message
      + '</p></div></li>';
  }

  /**
   * Envia notificação de que usuário está digitando
   * para todos os usuários presentes no chat.
   */
  private sendTypingToAll() {
    this.stompService.publish('/app/public-message', JSON.stringify(new BaseMessageModel(' está digitando...', EventConstant.TYPING)), {});
  }

  /**
   * Função responsável por envia mensagens para o websocket
   * passando pelo filtro '/app/public-message', o qual transforma
   * a string em upperCase antes de enviar para todos
   * que estão cadastrados no websocket e concatena a identificação do usuário.
   * Caso você não queira enviar a mensagem para ser tratada pelo
   * @MessageMapping (prefixo da aplicação) basta mudar
   * o endereço de envio de '/app/public-message' para '/topic/angularing-ws'.
   *
   * @param iptMsg // input to tipo texto vindo do html
   */
  private sendMessageToAll(iptMsg: any) {
    this.lastMessageOfLoggedUser = iptMsg.value;
    if (this.lastMessageOfLoggedUser !== undefined && this.lastMessageOfLoggedUser !== null && this.lastMessageOfLoggedUser.length > 0) {
      this.stompService.publish('/app/public-message', JSON.stringify(new BaseMessageModel
        (this.lastMessageOfLoggedUser, EventConstant.CHAT)), {});
      iptMsg.value = '';
    }
  }

  /**
   * Função responsável por envia uma notificação para o websocket
   * passando pelo filtro '/app/private-message', que concatena
   * a identificação do responsável por enviar a notificação e redireciona
   * a notificação apenas para o destinatário e para o próprio usuário que
   * está realizando o envio.
   * @param iptUser // input to tipo texto vindo do html
   */
  private sendAlertToUser(iptUser: any) {
    const user: string = iptUser.value;
    if (user !== undefined && user !== null && user.length > 0) {
      this.stompService.publish('/app/private-message/' + user, 'Opaaa!!!', {});
      iptUser.value = '';
    }
  }

}
