package com.weaw.webrtchub.repositories;

import com.weaw.webrtchub.models.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    Page<Message> findAllByRecipientId(String recipientId, Pageable pageable);

}
