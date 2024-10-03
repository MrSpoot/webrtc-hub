package com.weaw.webrtchub.repositories;

import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.UserFriends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFriendRepository extends JpaRepository<UserFriends, Long> {

    @Query("SELECT uf FROM UserFriends uf WHERE (uf.user = :user and uf.friend = :friend) " +
            "or (uf.user = :friend and uf.friend = :user)")
    List<UserFriends> findFriendsShipAlreadyExist(User user, User friend);

    @Query("SELECT uf FROM UserFriends uf WHERE (uf.user.id = :userId or uf.friend.id = :userId)")
    List<UserFriends> findUserFriendsByUserId(Long userId);

}
