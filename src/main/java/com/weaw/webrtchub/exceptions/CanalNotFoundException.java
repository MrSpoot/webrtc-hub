package com.weaw.webrtchub.exceptions;

public class CanalNotFoundException extends RuntimeException {
    public CanalNotFoundException(String id) {
        super("Canal not found -> " + id);
    }
}
