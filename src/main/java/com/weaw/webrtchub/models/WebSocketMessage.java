package com.weaw.webrtchub.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.weaw.webrtchub.enumerations.PayloadType;
import com.weaw.webrtchub.models.payloads.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebSocketMessage {

    private PayloadType type;

    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY, property = "type")
    @JsonSubTypes({
            @JsonSubTypes.Type(value = Message.class, name = "MESSAGE")
    })
    private Object payload;

    @Override
    public String toString() {
        return "{type: " + type + ", payload: " + payload + "}";
    }

}
