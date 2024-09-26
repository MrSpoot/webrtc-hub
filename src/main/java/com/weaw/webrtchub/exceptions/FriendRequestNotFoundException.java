package com.weaw.webrtchub.exceptions;

public class FriendRequestNotFoundException extends RuntimeException {
    public FriendRequestNotFoundException(long id) {
        super("Request not found: " + id);
    }
}
