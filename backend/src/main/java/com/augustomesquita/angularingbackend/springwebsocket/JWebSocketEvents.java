/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.springwebsocket;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

/**
 *
 * @author augusto
 */
@Component
public class JWebSocketEvents {

    @Autowired
    private JWebSocketSessionService sessionService;

    /**
     * Evento chamado no momento de conexão com o websocket.
     * Pega login do usuário no momento da conexão através dos headers e o
     * vincula ao seu usuário de websocket (definido no método 'determineUser').
     *
     * @param sessionConnectEvent
     */
    @EventListener
    public void onSessionConnectEvent(SessionConnectEvent sessionConnectEvent) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(sessionConnectEvent.getMessage());
        List<String> nativeHeader = stompHeaderAccessor.getNativeHeader("login");
        sessionService.register(sessionConnectEvent.getUser(), nativeHeader.get(0));
    }

    /**
     * Evento chamado no momento de desconexão com o websocket.
     * Remove o usuário da lista de sessão de usuários ativos no websocket.
     * 
     * @param sessionDisconnectEvent 
     */
    @EventListener
    public void onSessionDisconnectEvent(SessionDisconnectEvent sessionDisconnectEvent) {
        sessionService.removeSession(sessionDisconnectEvent.getUser());
    }

}
