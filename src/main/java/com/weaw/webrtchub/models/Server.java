package com.weaw.webrtchub.models;

import com.weaw.webrtchub.models.dtos.ChannelCreationDTO;
import com.weaw.webrtchub.models.dtos.ServerCreationDTO;
import com.weaw.webrtchub.models.projections.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "servers")
public class Server {

    @Id
    private String id;
    private String name;
    @DBRef
    private List<Channel> channels;
    private List<Long> users;

    public Server(ServerCreationDTO serverCreationDTO) {
        this.name = serverCreationDTO.getName();
        this.users = serverCreationDTO.getUsers();
        this.channels = new ArrayList<>();
        this.channels.add(new Channel(new ChannelCreationDTO("general",serverCreationDTO.getUsers()),false));
    }

}
