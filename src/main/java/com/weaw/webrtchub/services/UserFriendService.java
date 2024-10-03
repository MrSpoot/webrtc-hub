package com.weaw.webrtchub.services;

import com.weaw.webrtchub.exceptions.FriendRequestNotFoundException;
import com.weaw.webrtchub.exceptions.FriendShipAlreadyExistException;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.UserFriends;
import com.weaw.webrtchub.repositories.UserFriendRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public UserFriends findById(long id) throws FriendRequestNotFoundException {
        return userFriendRepository.findById(id).orElseThrow(() -> new FriendRequestNotFoundException(id));
    }

    public List<UserFriends> findAllByUserId(long id) throws FriendRequestNotFoundException {
        return userFriendRepository.findUserFriendsByUserId(id);
    }

    public UserFriends save(UserFriends userFriends) {
        return userFriendRepository.save(userFriends);
    }

    public void delete(long id) throws FriendRequestNotFoundException {
        userFriendRepository.deleteById(id);
    }

}
