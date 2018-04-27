package com.augustomesquita.angularingbackend.springwebsocket;

import com.augustomesquita.angularingbackend.springwebsocket.response.JChatResponse;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Augusto Mesquita
 */
@Controller
public class JWebSocketContoller {
    
    @Autowired
    private JWebSocketSessionService sessionService;
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
    /**
     * Endpoint que redireciona mensagem para /topic
     * @param message
     * @param principal
     * @return 
     */
    @MessageMapping("/public-message")
    @SendTo("/topic/angularing-ws")
    public JChatResponse publicMessage(String message, Principal principal) {
        
        String userName = principal.getName();
        String userUrlPicture = null;
        
        JWSUser wsUserFromSession = sessionService.getSessionFromPrincipal(principal);
        if (wsUserFromSession != null && wsUserFromSession.getUser() != null) {
            userName = wsUserFromSession.getUser().getName();
            userUrlPicture = wsUserFromSession.getUser().getPhotoUrl();
        }
        
        return new JChatResponse(message, userName, userUrlPicture);
    }
    
    // -------------  EXPLICAÇÃO SOBRE A ANOTAÇÃO @SendToUser() --------------
    //
    // Quando eu uso a anotação @SendToUser, significa que o usuário está
    // realizando a chamada receberá os dados caso o método possua retorno. (somente ele caso nenhum
    //
    // ** Atenção pois é SOMENTE o usuário que está REALIZANDO a ação que receberá
    // o resultado (por exemplo, ir buscar dados no servidor). 
    //
    // Somente se algum SimpMessagingTemplate esteja sendo utilizando dentro
    // do método alvo que será possível enviar essa informação para outras
    // sessões além da corrente.
    
    
    /**
     * Endpoint responsável por enviar mensagem para um usuário específico
     * e para o próprio usuário que está realizando o envio.
     * @param principal
     * @param emailUserDestination
     * @param message 
     */
    @MessageMapping("/private-message/{emailUserDestination}")
    @SendToUser("/queue/private")
    public String privateMessage(Principal principal, @DestinationVariable String emailUserDestination, String message) {
        String userDestination;
//        JWSUser wsUser = sessionService.getSessionFromEmail(emailUserDestination);
//        
//        if (wsUser != null) {
//            userDestination = wsUser.getUserIdentification().getName();
//        } else {
            userDestination = emailUserDestination;
//        }
        
        simpMessagingTemplate.convertAndSendToUser(userDestination, "/queue/private", message);
        return message;
    }
    
    /**
     * Endpoint responsável por retornar dados apenas para o próprio usuário
     * que está realizando a ação.
     * @param principal
     * @param message
     * @param to
     * @return message
     */
    @MessageMapping("/to-myself")
    @SendToUser("/queue/private")
    public String toMyself(Principal principal, String message, @DestinationVariable String to) {
        simpMessagingTemplate.convertAndSendToUser(to, "/queue/private", message);
        return "minha propria msg " + message;
    }
    
}
