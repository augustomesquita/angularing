/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.teste.IUserRepository;
import com.augustomesquita.angularingbackend.teste.JUser;
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
        userRepository.save(new JUser("a", 1, "cvbcvb", "zxzxzx"));
        Iterable<JUser> findAll = userRepository.findAll();
        return findAll;
    }

}
