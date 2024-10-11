package com.weaw.webrtchub.models;

import com.weaw.webrtchub.models.dtos.ChannelCreationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "channels")
public class Channel {

    @Id
    private String id;
    private String name;
    private List<Long> users;
    private boolean isPrivateCanal;

    public Channel(ChannelCreationDTO channelCreationDTO, boolean isPrivate) {
        this.name = channelCreationDTO.getName();
        this.users = channelCreationDTO.getUsers();
        this.isPrivateCanal = isPrivate;
    }
}
