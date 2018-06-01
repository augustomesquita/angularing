import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  ComponentFactory,
  ComponentRef,
  ElementRef,
} from '@angular/core';
import { Http } from '@angular/http';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { NotificationsService } from 'angular2-notifications';
import { Observable, Subscription, Subject } from 'rxjs/Rx';

import { EventConstant } from './../../../model/constant/event.constant';
import { BaseMessageModel } from './../../../model/entity/base-message.model';
import { ChatResponseModel } from './../../../model/entity/chat-response.model';
import { TypingResponseModel } from './../../../model/entity/typing-response.model';
import { ChatwsTextComponent } from './chatws-text/chatws-text.component';

@Component({
  selector: 'app-chatws',
  templateUrl: './chatws.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chatws.component.scss']
})
export class ChatWsComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  @ViewChild('chatContainer', { read: ViewContainerRef }) chatContainer: ViewContainerRef;

  private chatOff: boolean;
  private chatBoxOpened: boolean;
  private chatHeadTextInfo: string;

  private chatMessages: string;
  private lastMessageOfLoggedUser: string;
  private zone: NgZone;
  private componentRef: ComponentRef<ChatwsTextComponent>

  // Subjects (para utilização de debounceTime)
  private subjectSendTypingEvent: Subject<void>;
  private subjectReceiveTypingEvent: Subject<void>;

  // Subscriptions
  private subscriptionPublicMessages: Subscription;
  private subscriptionPrivateMessages: Subscription;

  // Observables
  public publicMessages: Observable<Message>;
  public privateMessages: Observable<Message>;

  // Status de inscrição
  public subscribedStatus: boolean;

  constructor(
    private http: Http, private stompService: StompService,
    private notificationService: NotificationsService,
    private cd: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) {
    this.lastMessageOfLoggedUser = '';
    this.chatOff = true;
  }

  /**
   * Método chamado ao iniciar componente
   */
  ngOnInit() {
    this.chatBoxOpened = false; // Define que o chat inicia fechado.
    this.chatMessages = ''; // Define que as conversas iniciam vazias.
    this.connect(); // Realiza conexão websocket

    // Inicia Subject para controle de envio de evento 'typing' para API.
    // Através do Subject conseguimos configurar o debouceTime que nos permite
    // pegar apenas o último evento de uma ação em um determinado período de tempo
    // e trabalhar com ela.
    this.subjectSendTypingEvent = new Subject<void>();
    this.subjectReceiveTypingEvent = new Subject<void>();
    this.configureSubjects();

    // Se inscreve em um Behavior Subject responsável por indicar o stado da conexão.
    // Por se tratar de um Behavior Subject, qualquer alteração que este objeto sofrer
    // nosso código será notificado, pelo fato de estarmos inscritos nele (para receber
    // o valor de forma assíncrona). Caso queira receber o valor de forma síncrona, basta
    // chamar o método 'getValue()' ao invéz de 'subscribe'. state == 0 (off) state == 1 (on)
    this.stompService.state.subscribe((state) => {
      if (state > 0) {
        this.chatOff = false;
        this.chatHeadTextInfo = 'Sala Pública'
      } else {
        this.chatOff = true;
        this.chatHeadTextInfo = 'Chat inativo... Tente mais tarde.'
      }
    });
  }

  /**
   * Método chamado ao destruir componente.
   */
  ngOnDestroy(): void {
    this.subscriptionPublicMessages.unsubscribe();  // Anula as inscrições realizadas
    this.subscriptionPrivateMessages.unsubscribe();  // Anula as inscrições realizadas
    this.componentRef.destroy();
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
    this.subscribedStatus = false;
    this.subscribe();
  }

  /**
   * Realiza subscribes no websocket.
   */
  public subscribe() {
    // Caso websocket socket já esteja aberto, retorna.
    if (this.subscribedStatus) {
      return;
    }

    // Stream de mensagens que irá receber dados vindo do canal '/topic/ws'
    this.publicMessages = this.stompService.subscribe('/topic/angularing-ws');

    // Stream de mensagens que irá receber dados vindo do canal privado '/user/queue/ws'
    this.privateMessages = this.stompService.subscribe('/user/queue/private');

    // Da Subscribe em messages para ficar escutando mensagens recebidas.
    // Ao receber uma mensagem, envia a mesma (no caso abaixo de forma explicita)
    // para o método publicMessageReceived.
    this.subscriptionPublicMessages = this.publicMessages.subscribe((message) => this.publicMessageReceived(message));

    // Da Subscribe em messages para ficar escutando mensagens recebidas.
    // Ao receber uma mensagem, envia a mesma (no caso abaixo de forma implicita)
    // para o método privateMessageReceived.
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
   * publicMessageReceived é uma variável que recebe uma função como valor (function expression).
   * Essa função é responsável por receber a mensagem pública do websocket.
   */
  private publicMessageReceived = (message: Message) => {

    const responseModel: BaseMessageModel = JSON.parse(message.body) as BaseMessageModel;

      if (responseModel.event == EventConstant.CHAT) {
        const messageModel: ChatResponseModel = JSON.parse(message.body) as ChatResponseModel;
        this.addMessageOnChat(messageModel);
      } else {
        const typingModel: TypingResponseModel = JSON.parse(message.body) as TypingResponseModel;
        if (this.chatHeadTextInfo != typingModel.message) {
          this.chatHeadTextInfo = typingModel.message;
        }
        this.subjectReceiveTypingEvent.next();
    }
  }


  /**
   * Adiciona mensagens de textos que sejam truthy (contexto boolean)
   * ao chat. Após isso realiza a detecção de modificam no DOM e faz
   * scroll para o fim do chat.
   * @param textMessage
   */
  private addMessageOnChat(textMessage: ChatResponseModel) {
    if (textMessage) {
      const isFromOtherUser = this.messageIsFromOtherUser(textMessage);
      this.createChatwsTextComponent(textMessage, isFromOtherUser);
    }
  }

  /**
   * Identifica se mensagem vem de outro usuário do sistema.
   * @param textMessage
   */
  private messageIsFromOtherUser(textMessage: ChatResponseModel) {
    let isFromOtherUser = false;
    if (this.lastMessageOfLoggedUser.toLowerCase() != textMessage.message.toLowerCase()) {
      isFromOtherUser = true;
    }
    return isFromOtherUser;
  }

  /**
   * Cria um componente referente a mensagem do usuário
   * através do createComponent. Realiza uma espécie de 'append'
   * (da maneira Angular) em nosso DOM.
   *
   * @param messageModel
   * @param isFromOtherUser
   */
  private createChatwsTextComponent(messageModel: ChatResponseModel, isFromOtherUser: boolean): void {

    // factory é uma espécie de objeto que sabe como fazer receitas para criação de componentes.
    const factory: ComponentFactory<ChatwsTextComponent> = this.resolver.resolveComponentFactory(ChatwsTextComponent);

    // Instancía componente através da 'receita' criado pelo factory.
    this.componentRef = this.chatContainer.createComponent(factory);

    // Passa os inputs para o componente recém criado.
    this.componentRef.instance.isFromOtherUser = isFromOtherUser;
    this.componentRef.instance.userUrlPicture = messageModel.userUrlPicture;
    this.componentRef.instance.userName = messageModel.userName;
    this.componentRef.instance.message = messageModel.message;

    // Detecta mudanças na view e rola scroll para fim do chat.
    this.cd.detectChanges();
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }


  /**
   * Função responsável por configurar os subjects do componente.
   */
  private configureSubjects() {
    // Configura subject que envia evento 'typing'.
    this.subjectSendTypingEvent.debounceTime(200).subscribe(() => {
      this.stompService.publish('/app/public-message',
      JSON.stringify(new BaseMessageModel(' está digitando...', EventConstant.TYPING)), {});
    });

    // Configura subject que recebe evento 'typing'.
    this.subjectReceiveTypingEvent.debounceTime(5000).subscribe(() => {
      this.chatHeadTextInfo = 'Sala Pública';
    });
  }


  /**
   * Envia notificação de que usuário está digitando
   * para todos os usuários presentes no chat.
   */
  private sendTypingToAll() {
    this.subjectSendTypingEvent.next();
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
