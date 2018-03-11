package com.augustomesquita.angularingbackend.service;

import com.augustomesquita.angularingbackend.model.JUserJPA;
import com.augustomesquita.angularingbackend.model.JUserJPA;
import java.util.Optional;

/**
 *
 * @author Augusto Mesquita
 */
public interface IUserServiceJPA {

    /**
     * Busca e retorna um usuário dado um email.
     *
     * @param email
     * @return Optional<JUser>
     */
    Optional<JUserJPA> findByEmail(String email);
    
    
     /**
     * Busca e retorna um usuário dado um email.
     *
     * @param email
     * @return Optional<JUser>
     */
    Optional<JUserJPA> findByEmailAndPassword(String email, String password);

}
