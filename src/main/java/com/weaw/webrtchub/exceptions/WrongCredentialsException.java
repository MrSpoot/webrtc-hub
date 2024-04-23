package com.weaw.webrtchub.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WrongCredentialsException extends RuntimeException{
    private static final Logger LOGGER = LoggerFactory.getLogger(WrongCredentialsException.class);

    public WrongCredentialsException() {
        super("Wrong credentials");
    }
}
