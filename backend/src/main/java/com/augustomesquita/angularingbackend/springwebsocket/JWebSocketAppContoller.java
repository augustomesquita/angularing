package com.augustomesquita.angularingbackend.springwebsocket;

import java.security.Principal;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Augusto Mesquita
 */
@Controller
public class JWebSocketAppContoller {
    
    @MessageMapping("/chat")
    public String processQuestion(String message, Principal principal) {
        return principal.getName() + ": " + message.toUpperCase();
    }
    
}
