package com.augustomesquita.angularingbackend.repository;

import com.augustomesquita.angularingbackend.model.JUser;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Augusto Mesquita
 */
public interface IUserRepository extends CrudRepository<JUser, Long> {

    JUser findByEmailAndPassword(String email, String password);

    JUser findByEmail(String email);
}
