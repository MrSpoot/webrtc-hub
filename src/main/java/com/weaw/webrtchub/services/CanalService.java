package com.weaw.webrtchub.services;

import com.weaw.webrtchub.models.Canal;
import com.weaw.webrtchub.models.dtos.CanalCreationDTO;
import com.weaw.webrtchub.repositories.CanalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CanalService {

    private final CanalRepository canalRepository;

    @Autowired
    public CanalService(CanalRepository canalRepository) {
        this.canalRepository = canalRepository;
    }

    public Canal findById(Long id) {
        return canalRepository.findById(id).orElse(null);
    }

    public Canal save(CanalCreationDTO canal) {
        return canalRepository.save(new Canal(canal));
    }
}
