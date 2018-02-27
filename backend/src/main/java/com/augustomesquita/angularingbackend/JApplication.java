/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend;

import com.augustomesquita.angularingbackend.teste.JUser;
import com.augustomesquita.angularingbackend.teste.ObservableUser;
import com.augustomesquita.angularingbackend.teste.ObserverUser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 *
 * @author augusto
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.augustomesquita.angularingbackend.controller")
public class JApplication {

    public static void main(String[] args) {
        SpringApplication.run(JApplication.class, args);     
        
        // Aplicando padrão Observer/Observable em conjunto com Singleton.
        ObserverUser observerUser = new ObserverUser(ObservableUser.getInstance());
        ObservableUser.getInstance().addObserver(observerUser);
        
        JUser user = new JUser();
        user.setAge(27);
    }
}
