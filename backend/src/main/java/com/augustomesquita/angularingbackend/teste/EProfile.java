/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

import java.util.Arrays;

/**
 *
 * @author augus
 */
public enum EProfile {
    ROLE_ADMIN(1),
    ROLE_USER(2);
    
    private final int value;

    private EProfile(int value) {
        this.value = value;
    }
    
    public EProfile getByValue(int value) {
        return Arrays.stream(values()).filter(v -> v.value == value).toArray(EProfile[]::new)[0];
    }
    
}
