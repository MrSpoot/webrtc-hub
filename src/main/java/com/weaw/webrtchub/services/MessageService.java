package com.weaw.webrtchub.services;

import com.weaw.webrtchub.models.Message;
import com.weaw.webrtchub.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message save(Message message) {
        return messageRepository.save(message);
    }

    public Page<Message> getAllByCanalId(String canalId, Pageable pageable) {
        return messageRepository.findAllByRecipientId(canalId, pageable);
    }

}
