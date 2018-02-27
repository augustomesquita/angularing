/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.teste.IUserRepository;
import com.augustomesquita.angularingbackend.teste.JUser;
import com.augustomesquita.angularingbackend.teste.ObservableUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author augusto
 */
@RestController
public class JHelloController {

    @Autowired
    IUserRepository userRepository;

    @RequestMapping("/")
    public Iterable<JUser> index() {
        Iterable<JUser> findByName = userRepository.findAll();
        
        // Testando se o método update() de ObserverElement será chamado ao
        // realizar a modificação do valor para 2.
        JUser user = new JUser("Augusto", 26, "asas", "asas");
        user.setAge(27);
        user.setName("Augustos");
        
        return findByName;
    }

}
