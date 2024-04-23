package com.weaw.webrtchub.repositories;

import com.weaw.webrtchub.models.payloads.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
}
