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


  constructor(private http: Http, private stompService: StompService) {
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

    // Stream de mensagens que irá receber mensagens vindas do canal '/topic/chat'
    this.messages = this.stompService.subscribe('/topic/chat');

    // Da Subscribe na função que é chamada ao receber mensagem.
    // Essa função por sua vez chama a função 'messageReceived'
    this.subscription = this.messages.subscribe(this.messageReceived);

    this.subscribed = true;
    this.chatOff = false;
  }

  // Função chamada ao receber mensagens
  public messageReceived = (message: Message) => {
    this.zone.run(() => {

      // Separa a mensagem recebida através do caracter ':',
      // gerando um array de 2 posições. Retira o valor da última array
      // gerada pelo split (porém o fato de remover da array o último valor,
      // não nos gera problema, uma vez que esta array foi criada pelo split).
      // Uma vez trabalhando com o valor removido da array, utilizamos o trim
      // para removermos os espaços em brancos encontrados no início e fim
      // da string. Por fim passamos tudo para minúsculo e armazenamos na
      // variável 'messageFormatted' para compararmos a mensagem recebida no mesmo
      // padrão da mensagem enviada, identificando assim se a mensagem que o usuário
      // recebeu é a mesma mensagem que ele enviou para modificar o avatar e posição
      // da conversa no chat.
      const messageFormatted = message.body.split(':').pop().trim().toLowerCase();

      if (this.message != messageFormatted) {
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
      this.stompService.publish('/app/chat', this.message, {});
      iptMessage.value = '';
    }
  }

}
