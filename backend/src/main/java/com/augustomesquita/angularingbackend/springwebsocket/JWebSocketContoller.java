package com.augustomesquita.angularingbackend.springwebsocket;

import com.augustomesquita.angularingbackend.springwebsocket.response.JChatResponse;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    @MessageMapping("/chat")
    public JChatResponse processQuestion(String message, Principal principal) {
        
        String userName = principal.getName();
        String userUrlPicture = null;
        
        JWSUser wsUserFromSession = sessionService.getSessionFromPrincipal(principal);
        if (wsUserFromSession != null && wsUserFromSession.getUser() != null) {
            userName = wsUserFromSession.getUser().getName();
            userUrlPicture = wsUserFromSession.getUser().getPhotoUrl();
        }
        
        return new JChatResponse(message, userName, userUrlPicture);
    }
    
    @MessageMapping("/private-message")
    public void processQuestion(Principal principal, String emailUserDestination, String message) {
        JWSUser userDestination = sessionService.getSessionFromEmail(emailUserDestination);
        simpMessagingTemplate.convertAndSendToUser(userDestination.getUserIdentification().getName(), "/queue/private", message);
    }
    
}
