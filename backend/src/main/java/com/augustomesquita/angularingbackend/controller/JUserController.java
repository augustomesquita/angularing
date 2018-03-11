package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.jpa.JUserJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.augustomesquita.angularingbackend.jpa.IUserRepositoryJPA;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author Augusto Mesquita
 */
@RestController
@RequestMapping("/users")
public class JUserController {

    @Autowired
    IUserRepositoryJPA userRepository;

    @GetMapping("")
    public Iterable<JUserJPA> users() {
        Iterable<JUserJPA> findAll = userRepository.findAll();
        return findAll;
    }

    @GetMapping(value = "/apenas-admins")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String adminRolePath(@PathVariable("name") String name) {
        return "Olá " + name + ", você é admin no sistema.";
    }

}
