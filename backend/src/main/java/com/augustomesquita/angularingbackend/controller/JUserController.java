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
        Iterable<JUser> findByName = userRepository.findAll();

        // Testando se o método update() de ObserverElement será chamado ao
        // realizar a modificação do valor para 2.
        JUser user = new JUser("Augusto", 26, "asas", "asas");
        user.setAge(27);
        user.setName("Augustos");

        return findByName;
    }

    @RequestMapping("login")
    public Boolean login(String userEmail, String userToken) {
        String accessToken = "1604161956329292|_GawFNpSH6p94Xp64nqwXbulg60";
        String url = "https://graph.facebook.com/debug_token?input_token=" + userToken + "&access_token=" + accessToken;
        
        JRestClient client = new JRestClient();
        String response = client.get(url);
        boolean isUserTokenValid = false;

        JSONObject responseJson = new JSONObject(response);
        Iterator<?> keys = responseJson.getJSONObject("data").keys();

        while (keys.hasNext()) {
            String key = (String) keys.next();
            if (key.contentEquals("is_valid")) {
                 isUserTokenValid = (boolean) responseJson.getJSONObject("data").get(key);
            }
        }

        return isUserTokenValid;
    }

}
