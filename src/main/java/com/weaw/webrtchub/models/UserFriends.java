package com.weaw.webrtchub.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_friends")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFriends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_id")
    private User friend;

    @Column(name = "is_accepted")
    private boolean isAccepted = false;

    public UserFriends(User user, User friend) {
        this.user = user;
        this.friend = friend;
    }

}
