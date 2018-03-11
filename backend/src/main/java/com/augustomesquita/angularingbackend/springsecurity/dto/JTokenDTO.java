package com.augustomesquita.angularingbackend.springsecurity.dto;

/**
 *
 * @author Augusto Mesquita
 */
public class JTokenDTO {
    
    private String token;

    public JTokenDTO() {
    }

    public JTokenDTO(String token) {
        this.token = token;
    }    

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
}
