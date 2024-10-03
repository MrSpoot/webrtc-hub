package com.weaw.webrtchub.services;

import com.weaw.webrtchub.exceptions.FriendShipAlreadyExistException;
import com.weaw.webrtchub.exceptions.UserNotFoundException;
import com.weaw.webrtchub.exceptions.WrongCredentialsException;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.UserFriends;
import com.weaw.webrtchub.models.projections.Profile;
import com.weaw.webrtchub.models.websocket.models.FriendRequest;
import com.weaw.webrtchub.repositories.UserRepository;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserFriendService userFriendService;
    private final SessionService sessionService;

    @Autowired
    public UserService(UserRepository userRepository, UserFriendService userFriendService, SessionService sessionService) {
        this.userRepository = userRepository;
        this.userFriendService = userFriendService;
        this.sessionService = sessionService;
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
        if (user != null) {
            return new Profile(user);
        } else {
            return null;
        }
    }

    @Transactional
    public UserFriends addFriend(String token, long friendId) throws UserNotFoundException, FriendShipAlreadyExistException {

        long userId = AuthenticationUtils.extractUserId(token);

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new UserNotFoundException(friendId));

        UserFriends friends = userFriendService.create(user, friend);

        user.getFriends().add(friends);
        friend.getFriends().add(friends);

        userRepository.save(user);
        userRepository.save(friend);

        sessionService.sendMessage(sessionService.getUserSessions(friendId), new FriendRequest(friends));

        return friends;
    }

    public long removeFriend(String token, long id) {
        long userId = AuthenticationUtils.extractUserId(token);
        UserFriends userFriends = userFriendService.findById(id);

        if(userFriends.getUser().getId() == userId || userFriends.getFriend().getId() == userId ){
            userFriendService.delete(id);
            return userFriends.getId();
        }else{
            throw new WrongCredentialsException();
        }
    }

    public UserFriends respondToFriendRequest(String token, long requestId, boolean response) {

        long userId = AuthenticationUtils.extractUserId(token);

        UserFriends userFriends = userFriendService.findById(requestId);

        if (userFriends.getFriend().getId() == userId) {
            if(!userFriends.isAccepted()){
                if (response) {
                    userFriends.setAccepted(true);
                    userFriends = userFriendService.save(userFriends);
                } else {
                    userFriendService.delete(requestId);
                }
                sessionService.sendMessage(sessionService.getUserSessions(userFriends.getUser().getId()), new FriendRequest(userFriends));
            }
            return userFriends;
        }
        throw new WrongCredentialsException();
    }

    public List<UserFriends> getUserFriends(String token) throws UserNotFoundException {
        long userId = AuthenticationUtils.extractUserId(token);
        return userFriendService.findAllByUserId(userId);
    }
}
