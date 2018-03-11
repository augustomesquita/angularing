package com.augustomesquita.angularingbackend.jpa;

import com.augustomesquita.angularingbackend.jpa.JUserJPA;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Augusto Mesquita
 */
@Service

public class JUserServiceImplJPA implements IUserServiceJPA {

    @Autowired
    private IUserRepositoryJPA userRepository;

    @Override
    public Optional<JUserJPA> findByEmail(String email) {
        return Optional.ofNullable(this.userRepository.findByEmail(email));
    }

}
