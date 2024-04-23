package com.weaw.webrtchub.repositories;

import com.weaw.webrtchub.models.Canal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanalRepository extends MongoRepository<Canal, Long> {
}
