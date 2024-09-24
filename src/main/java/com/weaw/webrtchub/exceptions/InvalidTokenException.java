package com.weaw.webrtchub.exceptions;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String token) {
        super("Invalid token -> "+token);
    }
}
