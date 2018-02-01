/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.flyway;

/**
 *
 * @author augusto
 */
public enum EFlywaySettings {

    DRIVER("org.postgresql.Driver"),
    USER("postgres"),
    PASSWORD("postgres"),
    URL("jdbc:postgresql:angularing_db"),
    INITIAL_SIZE("1"),
    MAX_ACTIVE_POOL_CONNECTION("5");
    

    private final String value;

    private EFlywaySettings(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
