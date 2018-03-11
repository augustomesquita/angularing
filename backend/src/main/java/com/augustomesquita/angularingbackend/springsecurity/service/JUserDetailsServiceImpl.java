package com.augustomesquita.angularingbackend.springsecurity.service;

import com.augustomesquita.angularingbackend.model.JUserJPA;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.augustomesquita.angularingbackend.service.IUserServiceJPA;
import com.augustomesquita.angularingbackend.springsecurity.jwt.JJwtUserFactory;

/**
 *
 * @author Augusto Mesquita
 */
@Service
public class JUserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    private IUserServiceJPA userService;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<JUserJPA> user = userService.findByEmail(username);
        
        if (user.isPresent()) {
            return JJwtUserFactory.create(user.get());
        }
        
        throw new UsernameNotFoundException("Email de usuário não encontrado.");
    }
    
}
