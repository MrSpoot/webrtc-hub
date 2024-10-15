package com.weaw.webrtchub.models.dtos;

import com.weaw.webrtchub.models.Channel;
import com.weaw.webrtchub.models.Server;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.projections.Profile;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.util.List;

@Data
public class ServerResponseDTO {

    @Id
    private String id;
    private String name;
    @DBRef
    private List<ChannelResponseDTO> channels;
    private List<Profile> users;

    public ServerResponseDTO(Server server, List<User> users) {
        this.id = server.getId();
        this.name = server.getName();
        this.channels = server.getChannels().stream().map(c ->
             new ChannelResponseDTO(c, users.stream().filter(user -> c.getUsers().contains(user.getId())).toList())
        ).toList();
        this.users = users.stream().map(Profile::new).toList();
    }

}
