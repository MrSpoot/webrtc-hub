package com.weaw.webrtchub.models.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    private long recipientId;
    private String message;
    private long senderId;
    private long createdAt = System.currentTimeMillis();

    @Override
    public String toString(){
      return "{ recipientId : "+recipientId+", message : "+message+", createdAt : "+createdAt+", senderId : "+senderId+"}";
    }
}
