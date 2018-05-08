/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.springwebsocket;

import com.augustomesquita.angularingbackend.model.JUser;
import com.augustomesquita.angularingbackend.repository.IUserRepository;
import java.security.Principal;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author augusto
 */
@Service
public class JWebSocketSessionService {

    @Autowired
    private IUserRepository userRepository;

    private final List<JWSUser> sessions;

    public JWebSocketSessionService() {
        sessions = new CopyOnWriteArrayList<>();
    }

    public List<JWSUser> getSessions() {
        return sessions;
    }

    public void register(Principal userIdentification, String email) {
        JUser user = userRepository.findByEmail(email);
        sessions.add(new JWSUser(userIdentification, user));
    }

    public void removeSession(Principal user) {
        JWSUser wsUserToRemove = sessions.stream().filter((wsUser) -> wsUser.getUserIdentification().getName().contentEquals(user.getName())).findFirst().orElse(null);
        sessions.remove(wsUserToRemove);
    }

    public JWSUser getSessionFromPrincipal(Principal user) {
        return sessions.stream().filter((session) -> session.getUserIdentification().getName().contentEquals(user.getName())).findFirst().orElse(null);
    }

    public JWSUser getSessionFromEmail(String email) {
        return sessions.stream().filter((JWSUser session) -> {
            boolean result = false;
            if (session.getUser() != null) {
                result = session.getUser().getEmail().contentEquals(email);
            }
            return result;
        }).findFirst().orElse(null);
    }

    public boolean hasOpenSessions() {
        return !sessions.isEmpty();
    }
}
