package com.weaw.webrtchub.models.websocket.models;

import com.weaw.webrtchub.models.UserFriends;
import com.weaw.webrtchub.models.projections.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequest {

    private long id;
    private Profile sender;
    private boolean accepted;
    private LocalDateTime createdAt;

    public FriendRequest(UserFriends userFriends) {
        this.id = userFriends.getId();
        this.createdAt = LocalDateTime.now();
        this.accepted = userFriends.isAccepted();
        this.sender = new Profile(userFriends.getUser());
    }
}
