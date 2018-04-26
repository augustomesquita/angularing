package com.augustomesquita.angularingbackend.springwebsocket.response;

/**
 *
 * @author Augusto Mesquita
 */
public class JChatResponse {
    private String message;
    private String userName;
    private String userUrlPicture;

    public JChatResponse(String message, String userName, String userUrlPicture) {
        this.message = message;
        this.userName = userName;
        this.userUrlPicture = userUrlPicture;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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
