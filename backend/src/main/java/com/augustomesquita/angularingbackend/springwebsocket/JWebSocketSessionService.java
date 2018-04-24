/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.springwebsocket;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

/**
 *
 * @author augusto
 */
@Service
public class JWebSocketSessionService {

    private final Map<Principal, String> sessions;

    public JWebSocketSessionService() {
        sessions = new ConcurrentHashMap<>();
    }

    public List<JWSSession> getSessions() {
        return sessions.entrySet().stream().map(entry -> {
            final JWSSession s = new JWSSession();
            s.setUserNick(entry.getValue());
            s.setUser(entry.getKey());
            return s;
        }).collect(Collectors.toList());
    }

    public void register(Principal user, String userNick) {
        sessions.put(user, userNick);
    }

    public void removeSession(Principal user) {
        sessions.remove(user);
    }

    public String getNickNameFromSession(Principal user) {
        return sessions.get(user);
    }

    public boolean hasOpenSessions() {
        return !sessions.isEmpty();
    }
}
