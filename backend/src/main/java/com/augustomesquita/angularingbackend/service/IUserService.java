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

    /**
     * Criado um novo usuário baseado nos dados de nome, email e senha que foram
     * passados.
     *
     * @param name
     * @param email
     * @param password
     */
    public JUser save(String name, String email, String password, String photoUrl);

}
