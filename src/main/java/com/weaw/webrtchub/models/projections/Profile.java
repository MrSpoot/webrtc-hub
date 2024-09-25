package com.weaw.webrtchub.models.projections;

import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.UserFriends;
import lombok.Data;

import java.util.List;

@Data
public class Profile {

    private Long id;
    private String username;
    private String email;
    private List<UserFriends> friends;

    public Profile(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.friends = user.getFriends();
    }
}
