package com.weaw.webrtchub.exceptions;

public class UsernameAlreadyTakenException extends RuntimeException {

    public UsernameAlreadyTakenException(String username) {
        super("Username already taken: " + username);
    }

}
