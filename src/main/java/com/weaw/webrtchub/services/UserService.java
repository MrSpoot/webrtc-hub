package com.weaw.webrtchub.services;

import com.weaw.webrtchub.exceptions.FriendShipAlreadyExistException;
import com.weaw.webrtchub.exceptions.UserNotFoundException;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.UserFriends;
import com.weaw.webrtchub.models.projections.Profile;
import com.weaw.webrtchub.repositories.UserRepository;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserFriendService userFriendService;

    @Autowired
    public UserService(UserRepository userRepository, UserFriendService userFriendService) {
        this.userRepository = userRepository;
        this.userFriendService = userFriendService;
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

    public User getUserById(long id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public Profile getUserProfile(String email) {
        User user = getUserByEmail(email);
        if(user != null) {
            return new Profile(user);
        }else{
            return null;
        }
    }

    public UserFriends addFriend(String token, long friendId) throws UserNotFoundException, FriendShipAlreadyExistException {

        long userId = AuthenticationUtils.extractUserId(token);

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new UserNotFoundException(friendId));

        UserFriends friends = userFriendService.create(user,friend);

        user.getFriends().add(friends);
        friend.getFriends().add(friends);

        userRepository.save(user);
        userRepository.save(friend);

        return friends;
    }

    public List<UserFriends> getUserFriends(long userId) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        return user.getFriends();
    }
}
