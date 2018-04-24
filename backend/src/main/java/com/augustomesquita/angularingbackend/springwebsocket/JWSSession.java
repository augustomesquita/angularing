/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.springwebsocket;

import java.security.Principal;

/**
 *
 * @author augusto
 */
public class JWSSession {

    private Principal user;
    private String userNick;
    private String host;

    public Principal getUser() {
        return user;
    }

    public void setUser(Principal user) {
        this.user = user;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getUserNick() {
        return userNick;
    }

    public void setUserNick(String userNick) {
        this.userNick = userNick;
    }
}
