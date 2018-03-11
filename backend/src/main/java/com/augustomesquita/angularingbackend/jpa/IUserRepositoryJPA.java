package com.augustomesquita.angularingbackend.jpa;

import com.augustomesquita.angularingbackend.jpa.JUserJPA;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Augusto Mesquita
 */
public interface IUserRepositoryJPA extends CrudRepository<JUserJPA, Long> {

    JUserJPA findByEmail(String email);
}
