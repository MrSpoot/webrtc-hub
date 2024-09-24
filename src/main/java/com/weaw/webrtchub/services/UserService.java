package com.weaw.webrtchub.services;

import com.weaw.webrtchub.exceptions.InvalidTokenException;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.projections.Profile;
import com.weaw.webrtchub.repositories.UserRepository;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final TokenService tokenService;

    @Autowired
    public UserService(UserRepository userRepository,TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByUsername(String email) {
        return userRepository.findByUsername(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Profile getUserProfile(String token){
        if(tokenService.validateToken(token)){
            Long userId = AuthenticationUtils.extractUserId(token);
            if(userId != null){
                Optional<User> user = userRepository.findById(userId);
                if(user.isPresent()){
                    return new Profile(user.get());
                }
            }

        }
        throw new InvalidTokenException(token);
    }
}
