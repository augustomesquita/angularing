/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.springwebsocket;

import com.augustomesquita.angularingbackend.model.JUser;
import java.security.Principal;

/**
 *
 * @author augusto
 */
public class JWSUser {

    private Principal userIdentification;
    private JUser user;

    public JWSUser(Principal userIdentification, JUser user) {
        this.userIdentification = userIdentification;
        this.user = user;
    }
    
    public Principal getUserIdentification() {
        return userIdentification;
    }

    public void setUserIdentification(Principal userIdentification) {
        this.userIdentification = userIdentification;
    }

    public JUser getUser() {
        return user;
    }

    public void setUser(JUser user) {
        this.user = user;
    }
}
