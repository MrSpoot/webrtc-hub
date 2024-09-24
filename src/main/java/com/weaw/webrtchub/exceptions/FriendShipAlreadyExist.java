package com.weaw.webrtchub.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FriendShipAlreadyExist extends Exception{
    public FriendShipAlreadyExist(long userId, long friendId) {
        super("Friendship already exist User -> "+userId+" Friend -> "+friendId);
    }
}
