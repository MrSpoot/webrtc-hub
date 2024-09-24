package com.weaw.webrtchub.models.dtos;

import com.weaw.webrtchub.models.UserFriends;
import com.weaw.webrtchub.models.projections.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFriendsResponseDTO {

    private Long id;
    private Profile user;
    private Profile friend;
    private boolean isAccepted = false;

    public UserFriendsResponseDTO(UserFriends userFriends) {
        this.id = userFriends.getId();
        this.user = new Profile(userFriends.getUser());
        this.friend = new Profile(userFriends.getFriend());
        this.isAccepted = userFriends.isAccepted();
    }

}
