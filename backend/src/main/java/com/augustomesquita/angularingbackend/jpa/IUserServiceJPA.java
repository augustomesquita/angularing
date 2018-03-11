package com.augustomesquita.angularingbackend.jpa;

import com.augustomesquita.angularingbackend.jpa.JUserJPA;
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

}
