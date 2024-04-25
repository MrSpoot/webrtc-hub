package com.weaw.webrtchub.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebSocketMessage {

    private String path;
    private Object payload;

    @Override
    public String toString() {
        return "{path: " + path + ", payload: " + payload + "}";
    }

}
