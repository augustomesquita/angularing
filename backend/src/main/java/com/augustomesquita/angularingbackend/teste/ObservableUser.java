/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

import java.util.Observable;

/**
 *
 * @author augus
 */
public class ObservableUser extends Observable {

    private static final ObservableUser INSTANCE = new ObservableUser();
   
    public static ObservableUser getInstance(){
        return INSTANCE;
    }

    public ObservableUser() {}
    
    private Integer userAge;
    private String userName;

    public Integer getUserAge() {
        return userAge;
    }
    
    public String getUserName() {
        return userName;
    }

    public void setUserAge(Integer userAge) {
        this.userAge = userAge;
        setChanged();
        notifyObservers("userAge");
    }

    public void setUserName(String userName) {
        this.userName = userName;
        setChanged();
        notifyObservers("userName");
    }
   
}
