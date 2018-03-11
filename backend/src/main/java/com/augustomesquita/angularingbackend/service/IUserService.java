package com.augustomesquita.angularingbackend.service;

import com.augustomesquita.angularingbackend.model.JUser;
import com.augustomesquita.angularingbackend.model.JUser;
import java.util.Optional;

/**
 *
 * @author Augusto Mesquita
 */
public interface IUserService {

    /**
     * Busca e retorna um usuário dado um email.
     *
     * @param email
     * @return Optional<JUser>
     */
    Optional<JUser> findByEmail(String email);
    
    
     /**
     * Busca e retorna um usuário dado um email.
     *
     * @param email
     * @return Optional<JUser>
     */
    Optional<JUser> findByEmailAndPassword(String email, String password);

}
