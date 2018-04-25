package com.augustomesquita.angularingbackend.springwebsocket;

import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Augusto Mesquita
 */
@Controller
public class JWebSocketContoller {
    
    @Autowired
    private JWebSocketSessionService sessionService;
    
    @MessageMapping("/chat")
    public String processQuestion(String message, Principal principal) {
        
        String userName = principal.getName();
        
        JWSUser wsUserFromSession = sessionService.getWSUserFromSession(principal);
        if (wsUserFromSession != null && wsUserFromSession.getUser() != null) {
            userName = wsUserFromSession.getUser().getName();
        }
        
        return userName + ": " + message.toUpperCase();
    }
    
}
