package com.weaw.webrtchub.enumerations;

import lombok.Getter;

@Getter
public enum WebSocketStatusCode {

    NOT_FOUND("404"),
    INVALID_ARGUMENT("400"),
    OK("200");

    private final String code;

    WebSocketStatusCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return code;
    }

}
