package com.augustomesquita.angularingbackend.springsecurity.dto;

import com.augustomesquita.angularingbackend.model.JUser;

/**
 *
 * @author Augusto Mesquita
 */
public class JUserAndTokenDTO {
    
    private String token;
    private JUserDTO user; 

    public JUserAndTokenDTO(String token, JUserDTO user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public JUserDTO getUser() {
        return user;
    }

    public void setUser(JUserDTO user) {
        this.user = user;
    }
    
}
