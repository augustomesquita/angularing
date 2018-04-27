package com.augustomesquita.angularingbackend.springwebsocket.response;

import com.augustomesquita.angularingbackend.springwebsocket.constants.JEvent;

/**
 *
 * @author Augusto Mesquita
 */
public class JResponseChat extends AResponse {

    private String userName;
    private String userUrlPicture;

    public JResponseChat(String message, String userName, String userUrlPicture) {
        this.message = message;
        this.userName = userName;
        this.userUrlPicture = userUrlPicture;
        this.event =  JEvent.CHAT;
    }

    public JResponseChat() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserUrlPicture() {
        return userUrlPicture;
    }

    public void setUserUrlPicture(String userUrlPicture) {
        this.userUrlPicture = userUrlPicture;
    }
}
