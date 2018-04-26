package com.augustomesquita.angularingbackend.springwebsocket;

import com.augustomesquita.angularingbackend.springwebsocket.response.JChatResponse;
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
    public JChatResponse processQuestion(String message, Principal principal) {
        
        String userName = principal.getName();
        String userUrlPicture = null;
        
        JWSUser wsUserFromSession = sessionService.getWSUserFromSession(principal);
        if (wsUserFromSession != null && wsUserFromSession.getUser() != null) {
            userName = wsUserFromSession.getUser().getName();
            userUrlPicture = wsUserFromSession.getUser().getPhotoUrl();
        }
        
        return new JChatResponse(message, userName, userUrlPicture);
    }
    
}
