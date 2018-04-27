package com.augustomesquita.angularingbackend.springwebsocket.request;

/**
 *
 * @author Augusto Mesquita
 */
public class JMessageRequest {

    private String message;
    private String event;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }
}
