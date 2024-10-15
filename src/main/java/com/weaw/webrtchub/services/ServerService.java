package com.weaw.webrtchub.services;

import com.weaw.webrtchub.models.Server;
import com.weaw.webrtchub.models.dtos.ServerCreationDTO;
import com.weaw.webrtchub.models.dtos.ServerResponseDTO;
import com.weaw.webrtchub.repositories.ServerRepository;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServerService {

    private final ServerRepository serverRepository;
    private final UserService userService;
    private final ChannelService channelService;

    @Autowired
    public ServerService(ServerRepository serverRepository, UserService userService,ChannelService channelService) {
        this.serverRepository = serverRepository;
        this.userService = userService;
        this.channelService = channelService;
    }

    public List<ServerResponseDTO> getUserServer(String token) {
        long userId = AuthenticationUtils.extractUserId(token);
        List<Server> servers = serverRepository.findByUsersContaining(userId);
        return servers.stream().map(s -> new ServerResponseDTO(s,userService.getUsersByIds(s.getUsers()))).toList();
    }

    public ServerResponseDTO createNewServer(String token, ServerCreationDTO serverCreationDTO) {
        long userId = AuthenticationUtils.extractUserId(token);

        if(!serverCreationDTO.getUsers().contains(userId)) {
           serverCreationDTO.getUsers().add(userId);
        }

        Server server = new Server(serverCreationDTO);
        server.setChannels(channelService.save(server.getChannels()));
        server = serverRepository.save(server);
        return new ServerResponseDTO(server,userService.getUsersByIds(server.getUsers()));
    }
}
