package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.model.JUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.augustomesquita.angularingbackend.repository.IUserRepository;

/**
 *
 * @author Augusto Mesquita
 */
@RestController
@RequestMapping("/users")
public class JUserController {

    @Autowired
    IUserRepository userRepository;

    @GetMapping("")
    public Iterable<JUser> users() {
        Iterable<JUser> findAll = userRepository.findAll();
        return findAll;
    }

    @GetMapping(value = "/apenas-admins")
//    @PreAuthorize("hasAnyRole('ADMIN')")
    public String adminRolePath() {
        return "Olá você é um admin no sistema!";
    }

}
