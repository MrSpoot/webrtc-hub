package com.weaw.webrtchub.services;

import com.weaw.webrtchub.models.Canal;
import com.weaw.webrtchub.models.dtos.CanalCreationDTO;
import com.weaw.webrtchub.models.payloads.Message;
import com.weaw.webrtchub.repositories.CanalRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

@Service
public class CanalService {

    private final CanalRepository canalRepository;
    private final SessionService sessionService;
    private final MessageService messageService;

    @Autowired
    public CanalService(CanalRepository canalRepository, SessionService sessionService, MessageService messageService) {
        this.canalRepository = canalRepository;
        this.sessionService = sessionService;
        this.messageService = messageService;
    }

    public Message processMessage(Message message) {
        Canal canal = findById(message.getRecipientId());
        if(canal != null) {
            List<WebSocketSession> sessions = sessionService.getUserSessions(canal.getUsers());
            sessionService.sendMessage(sessions,message);
            canal.getMessages().add(message);
            Message response = messageService.save(message);
            save(canal);
            return response;
        }
        return null;
    }

    public Canal findById(String id) {
        return canalRepository.findById(new ObjectId(id).toString()).orElse(null);
    }

    public Canal save(Canal canal) {
        return canalRepository.save(canal);
    }

    public Canal save(CanalCreationDTO canal) {
        return canalRepository.save(new Canal(canal));
    }
}
