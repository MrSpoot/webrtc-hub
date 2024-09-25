package com.weaw.webrtchub.exceptions;

public class FriendShipAlreadyExistException extends Exception{
    public FriendShipAlreadyExistException() {
        super("Friendship already exist");
    }
}
