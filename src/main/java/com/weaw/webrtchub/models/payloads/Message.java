package com.weaw.webrtchub.models.payloads;

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

    @Override
    public String toString(){
      return "{ recipientId : "+recipientId+", message : "+message+", createdAt : "+createdAt+", senderId : "+senderId+"}";
    }
}
