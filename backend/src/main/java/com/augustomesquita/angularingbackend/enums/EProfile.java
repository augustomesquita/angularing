package com.augustomesquita.angularingbackend.enums;

import java.util.Arrays;

/**
 *
 * @author Augusto Mesquita
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
