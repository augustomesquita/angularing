/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend;

import com.augustomesquita.angularingbackend.teste.ObservableElement;
import com.augustomesquita.angularingbackend.teste.ObserverElement;
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
        
        ObserverElement observerElement = new ObserverElement(ObservableElement.getInstance());
        ObservableElement.getInstance().addObserver(observerElement);
        
        ObservableElement.getInstance().setMeuValor(1);
        
    }
}
