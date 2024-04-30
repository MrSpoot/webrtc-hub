package com.weaw.webrtchub.models;

import com.weaw.webrtchub.enumerations.WebSocketStatusCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebSocketResponse {

    private WebSocketStatusCode status;
    private Object payload;

    @Override
    public String toString() {
        return "{status: " + status.getCode() + ", payload: " + payload + "}";
    }
}
