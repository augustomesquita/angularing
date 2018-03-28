package com.augustomesquita.angularingbackend.controller.websocket;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 *
 * @author Augusto Mesquita
 */
@RestController()
@RequestMapping("/messagings")
public class JCoursesController {

    private List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @CrossOrigin
    @GetMapping()
    public SseEmitter courses() {
        SseEmitter sseEmitter = new SseEmitter();
        this.emitters.add(sseEmitter);
        sseEmitter.onCompletion(() -> this.emitters.remove(sseEmitter));
        return sseEmitter;
    }

    @CrossOrigin
    @PostMapping(value = "new")
    public void postCourse(@RequestBody String message) {
        emitters.forEach((emitter) -> {
            try {
                emitter.send(SseEmitter.event().name("course-created").data(message));
            } catch (IOException ex) {
                Logger.getLogger(JCoursesController.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
    }
    
}
