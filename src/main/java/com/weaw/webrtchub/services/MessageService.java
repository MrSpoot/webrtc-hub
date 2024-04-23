package com.weaw.webrtchub.services;

import com.weaw.webrtchub.enumerations.PayloadType;
import com.weaw.webrtchub.models.Canal;
import com.weaw.webrtchub.models.payloads.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import java.util.List;

@Service
public class MessageService {

    private final SessionService sessionService;
    private final CanalService canalService;

    @Autowired
    public MessageService(SessionService sessionService, CanalService canalService) {
        this.sessionService = sessionService;
        this.canalService = canalService;
    }

    public void processMessage(Message message) {
        Canal canal = canalService.findById(message.getRecipientId());
        if(canal != null) {
            List<WebSocketSession> sessions = sessionService.getUserSessions(canal.getUsers());
            sessionService.sendMessage(sessions, PayloadType.MESSAGE,message);
        }
    }

}
