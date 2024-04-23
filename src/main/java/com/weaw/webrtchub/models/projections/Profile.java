package com.weaw.webrtchub.models.projections;

import com.weaw.webrtchub.models.User;
import lombok.Data;

@Data
public class Profile {

    private Long id;
    private String username;
    private String email;

    public Profile(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
