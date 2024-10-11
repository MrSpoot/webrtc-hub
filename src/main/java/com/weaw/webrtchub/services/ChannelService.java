package com.weaw.webrtchub.services;

import com.weaw.webrtchub.exceptions.CanalNotFoundException;
import com.weaw.webrtchub.exceptions.WrongCredentialsException;
import com.weaw.webrtchub.models.Channel;
import com.weaw.webrtchub.models.dtos.ChannelCreationDTO;
import com.weaw.webrtchub.models.Message;
import com.weaw.webrtchub.repositories.ChannelRepository;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final SessionService sessionService;
    private final MessageService messageService;

    @Autowired
    public ChannelService(ChannelRepository channelRepository, SessionService sessionService, MessageService messageService) {
        this.channelRepository = channelRepository;
        this.sessionService = sessionService;
        this.messageService = messageService;
    }

    public Message processMessage(String canalId, String senderToken, String message) {
        Channel channel = findById(canalId);
        long senderId = AuthenticationUtils.extractUserId(senderToken);
        if(channel != null) {
            if(channel.getUsers().contains(senderId)) {
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
        Channel channel = findById(canalId);
        if(channel != null) {
            return messageService.getAllByCanalId(canalId,pageable);
        }
        throw new CanalNotFoundException(canalId);
    }

    public Page<Channel> getAllPrivateCanalsOfUser(String token, Pageable pageable) {
        long userId = AuthenticationUtils.extractUserId(token);
        return channelRepository.findAllByUsersContainingAndIsPrivateCanalTrue(userId,pageable);
    }

    public Channel findById(String id) {
        return channelRepository.findById(new ObjectId(id).toString()).orElse(null);
    }

    public Channel savePrivateCanal(ChannelCreationDTO canal) {
        return channelRepository.save(new Channel(canal,true));
    }

    public Channel saveServerCanal(ChannelCreationDTO canal) {
        return channelRepository.save(new Channel(canal,false));
    }
}
