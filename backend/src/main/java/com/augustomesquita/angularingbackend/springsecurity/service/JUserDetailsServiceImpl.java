package com.augustomesquita.angularingbackend.springsecurity.service;

import com.augustomesquita.angularingbackend.model.JUser;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.augustomesquita.angularingbackend.springsecurity.JJwtUserFactory;
import com.augustomesquita.angularingbackend.service.IUserService;

/**
 *
 * @author Augusto Mesquita
 */
@Service
public class JUserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    private IUserService userService;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<JUser> user = userService.findByEmail(username);
        
        if (user.isPresent()) {
            return JJwtUserFactory.create(user.get());
        }
        
        throw new UsernameNotFoundException("Email de usuário não encontrado.");
    }
    
}
