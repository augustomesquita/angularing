/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.teste.IUserRepository;
import com.augustomesquita.angularingbackend.teste.JUser;
import com.augustomesquita.angularingbackend.utils.JRestClient;
import java.util.Iterator;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author augusto
 */
@RestController
@RequestMapping("/users")
public class JUserController {

    @Autowired
    IUserRepository userRepository;

    @RequestMapping("")
    public Iterable<JUser> users() {
        Iterable<JUser> findAll = userRepository.findAll();
        return findAll;
    } 

}
