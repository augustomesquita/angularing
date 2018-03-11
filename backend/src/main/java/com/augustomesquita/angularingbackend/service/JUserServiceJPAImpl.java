package com.augustomesquita.angularingbackend.service;

import com.augustomesquita.angularingbackend.repository.IUserRepositoryJPA;
import com.augustomesquita.angularingbackend.service.IUserServiceJPA;
import com.augustomesquita.angularingbackend.model.JUserJPA;
import com.augustomesquita.angularingbackend.model.JUserJPA;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Augusto Mesquita
 */
@Service
public class JUserServiceJPAImpl implements IUserServiceJPA {

    @Autowired
    private IUserRepositoryJPA userRepository;

    @Override
    public Optional<JUserJPA> findByEmailAndPassword(String email, String password) {
        return Optional.ofNullable(this.userRepository.findByEmailAndPassword(email, password));
    }

    @Override
    public Optional<JUserJPA> findByEmail(String email) {
        return Optional.ofNullable(this.userRepository.findByEmail(email));
    }

}
