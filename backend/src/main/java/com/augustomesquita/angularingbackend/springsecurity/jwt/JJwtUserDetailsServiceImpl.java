package com.augustomesquita.angularingbackend.springsecurity.jwt;

import com.augustomesquita.angularingbackend.jpa.JUserJPA;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.augustomesquita.angularingbackend.jpa.IUserServiceJPA;

/**
 *
 * @author Augusto Mesquita
 */
@Service
public class JJwtUserDetailsServiceImpl implements UserDetailsService {
    
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
