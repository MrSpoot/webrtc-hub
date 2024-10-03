package com.weaw.webrtchub.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "messages")
public class Message {

    @Id
    private String id;
    private String recipientId;
    private String message;
    private long senderId;
    private long createdAt = System.currentTimeMillis();

    public Message(String recipientId, String message, long senderId) {
        this.recipientId = recipientId;
        this.message = message;
        this.senderId = senderId;
        this.createdAt = System.currentTimeMillis();
    }

    @Override
    public String toString(){
      return "{ recipientId : "+recipientId+", message : "+message+", createdAt : "+createdAt+", senderId : "+senderId+"}";
    }
}
