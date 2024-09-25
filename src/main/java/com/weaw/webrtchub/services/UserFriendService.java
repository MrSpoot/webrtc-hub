package com.weaw.webrtchub.services;

import com.weaw.webrtchub.exceptions.FriendShipAlreadyExistException;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.UserFriends;
import com.weaw.webrtchub.repositories.UserFriendRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFriendService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserFriendService.class);

    private final UserFriendRepository userFriendRepository;

    @Autowired
    public UserFriendService(UserFriendRepository userFriendRepository) {
        this.userFriendRepository = userFriendRepository;
    }

    public UserFriends create(User user, User friend) throws FriendShipAlreadyExistException {
        if (userFriendRepository.findFriendsShipAlreadyExist(user, friend).isEmpty()) {
            return userFriendRepository.save(new UserFriends(user, friend));
        }
        throw new FriendShipAlreadyExistException();
    }

}
