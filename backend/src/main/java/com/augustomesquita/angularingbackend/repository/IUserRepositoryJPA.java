package com.augustomesquita.angularingbackend.repository;

import com.augustomesquita.angularingbackend.model.JUserJPA;
import com.augustomesquita.angularingbackend.model.JUserJPA;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Augusto Mesquita
 */
public interface IUserRepositoryJPA extends CrudRepository<JUserJPA, Long> {

    JUserJPA findByEmailAndPassword(String email, String password);

    JUserJPA findByEmail(String email);
}
