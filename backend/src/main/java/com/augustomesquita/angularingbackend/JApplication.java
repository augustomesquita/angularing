package com.augustomesquita.angularingbackend;

import java.time.LocalDateTime;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Augusto Mesquita
 */
@SpringBootApplication
@ComponentScan()
@RestController
public class JApplication {

    public static void main(String[] args) {
        SpringApplication.run(JApplication.class, args);
    }

    @RequestMapping("/")
    public String status() {
        JSONObject response = new JSONObject();
        response.put("status", "online")
                .put("date_now", LocalDateTime.now().toString());
        return response.toString();
    }
}
