package com.weaw.webrtchub.repositories;

import com.weaw.webrtchub.models.Server;
import com.weaw.webrtchub.models.projections.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepository extends MongoRepository<Server, String> {

    List<Server> findByUsersContaining(Long userId);

}
