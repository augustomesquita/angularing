package com.augustomesquita.angularingbackend.service;

import com.augustomesquita.angularingbackend.enums.EProfile;
import com.augustomesquita.angularingbackend.model.JUser;
import com.augustomesquita.angularingbackend.model.JUser;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.augustomesquita.angularingbackend.repository.IUserRepository;
import com.augustomesquita.angularingbackend.service.IUserService;

/**
 *
 * @author Augusto Mesquita
 */
@Service
public class JUserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public Optional<JUser> findByEmailAndPassword(String email, String password) {
        return Optional.ofNullable(this.userRepository.findByEmailAndPassword(email, password));
    }

    @Override
    public Optional<JUser> findByEmail(String email) {
        return Optional.ofNullable(this.userRepository.findByEmail(email));
    }

    @Override
    public JUser save(String name, String email, String password, String photoUrl) {
        JUser user = new JUser();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setPhotoUrl(photoUrl);
        user.setProfile(EProfile.ROLE_USER);
        return this.userRepository.save(user);
    }

}
