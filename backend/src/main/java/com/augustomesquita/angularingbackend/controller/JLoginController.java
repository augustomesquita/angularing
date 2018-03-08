/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.utils.JRestClient;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Iterator;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author augus
 */
@RestController
public class JLoginController {

    @RequestMapping("/login")
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
