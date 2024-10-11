package com.weaw.webrtchub.repositories;

import com.weaw.webrtchub.models.Channel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelRepository extends MongoRepository<Channel, String> {

    Page<Channel> findAllByUsersContainingAndIsPrivateCanalTrue(long userId, Pageable pageable);

}
