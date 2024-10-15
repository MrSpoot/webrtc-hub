package com.weaw.webrtchub.models.dtos;

import com.weaw.webrtchub.models.Channel;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.projections.Profile;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class ChannelResponseDTO {

    @Id
    private String id;
    private String name;
    private List<Profile> users;

    public ChannelResponseDTO(Channel channel, List<User> users) {
        this.id = channel.getId();
        this.name = channel.getName();
        this.users = users.stream().map(Profile::new).toList();
    }

}
