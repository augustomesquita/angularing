/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author augus
 */
@Service

public class JUserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public Optional<JUser> findByEmail(String email) {
        return Optional.ofNullable(this.userRepository.findByEmail(email));
    }

}
