/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

import java.util.Optional;

/**
 *
 * @author augus
 */
public interface IUserService {

    /**
     * Busca e retorna um usuário dado um email.
     *
     * @param email
     * @return Optional<JUser>
     */
    Optional<JUser> findByEmail(String email);

}
