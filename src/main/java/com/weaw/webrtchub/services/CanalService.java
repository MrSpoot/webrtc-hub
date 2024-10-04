package com.weaw.webrtchub.services;

import com.weaw.webrtchub.exceptions.CanalNotFoundException;
import com.weaw.webrtchub.exceptions.WrongCredentialsException;
import com.weaw.webrtchub.models.Canal;
import com.weaw.webrtchub.models.dtos.CanalCreationDTO;
import com.weaw.webrtchub.models.Message;
import com.weaw.webrtchub.repositories.CanalRepository;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Message processMessage(String canalId, String senderToken, String message) {
        Canal canal = findById(canalId);
        long senderId = AuthenticationUtils.extractUserId(senderToken);
        if(canal != null) {
            if(canal.getUsers().contains(senderId)) {
                Message messageToSend = new Message(canalId,message,senderId);
                Message m = messageService.save(messageToSend);
                //TODO send m with websocket
                return m;
            }
            throw new WrongCredentialsException();
        }
        throw new CanalNotFoundException(canalId);
    }

    public Page<Message> getAllMessageByCanalId(String canalId, Pageable pageable) {
        Canal canal = findById(canalId);
        if(canal != null) {
            return messageService.getAllByCanalId(canalId,pageable);
        }
        throw new CanalNotFoundException(canalId);
    }

    public Page<Canal> getAllPrivateCanalsOfUser(String token, Pageable pageable) {
        long userId = AuthenticationUtils.extractUserId(token);
        return canalRepository.findAllByUsersContainingAndIsPrivateCanalTrue(userId,pageable);
    }

    public Canal findById(String id) {
        return canalRepository.findById(new ObjectId(id).toString()).orElse(null);
    }

    public Canal savePrivateCanal(CanalCreationDTO canal) {
        return canalRepository.save(new Canal(canal,true));
    }

    public Canal saveServerCanal(CanalCreationDTO canal) {
        return canalRepository.save(new Canal(canal,false));
    }
}
