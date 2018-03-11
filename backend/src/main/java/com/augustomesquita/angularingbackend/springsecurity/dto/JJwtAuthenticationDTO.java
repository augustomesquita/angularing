package com.augustomesquita.angularingbackend.springsecurity.dto;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author Augusto Mesquita
 */
public class JJwtAuthenticationDTO {
    
    private String email;
    private String password;

    @NotEmpty(message = "Email não pode ser vazio.")
    @Email(message = "Email inválido.")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @NotEmpty(message = "Senha não pode ser vazia.")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "JJwtAuthenticationDTO[email=" + email 
                + ", password=" + password + "]";
    }
    
    
}
