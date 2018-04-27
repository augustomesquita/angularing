/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.springwebsocket.response;

import com.augustomesquita.angularingbackend.springwebsocket.constants.JEvent;

/**
 *
 * @author augusto
 */
public class JResponseTyping extends AResponse {

    public JResponseTyping(String message) {
        this.message = message;
        this.event = JEvent.TYPING;
    }
}
