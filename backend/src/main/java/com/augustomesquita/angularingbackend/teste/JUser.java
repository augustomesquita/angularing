/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author augusto
 */
@Entity
@Table(name = "_user")
public class JUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String login;
    private String password;

    public JUser() {
    }

    public JUser(String name, Integer age, String login, String password) {
        this.name = name;
        ObservableUser.getInstance().setUserName(this.name);
        
        this.age = age;
        ObservableUser.getInstance().setUserAge(this.age);
        
        this.login = login;
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        ObservableUser.getInstance().setUserName(this.name);
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
        ObservableUser.getInstance().setUserAge(this.age);
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "JUser[id=" + getId() + ", name=" + name + ", age=" + age + ", login=" + login + ", password=" + password + ']';
    }

}
