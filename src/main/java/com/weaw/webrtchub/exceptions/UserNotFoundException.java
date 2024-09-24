package com.weaw.webrtchub.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(long id) {
        super("User not found -> " + id);
    }
}
