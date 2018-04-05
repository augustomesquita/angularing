package com.augustomesquita.angularingbackend.springwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Augusto Mesquita
 */
@Controller
public class JWebSocketContoller {
    
    @MessageMapping("/chat")
    public String processQuestion(String message) {
        return message.toUpperCase();
    }
    
}
