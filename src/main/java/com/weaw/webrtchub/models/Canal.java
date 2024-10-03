package com.weaw.webrtchub.models;

import com.weaw.webrtchub.models.dtos.CanalCreationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "canals")
public class Canal {

    @Id
    private String id;
    private String name;
    private List<Long> users;

    public Canal(CanalCreationDTO canalCreationDTO) {
        this.name = canalCreationDTO.getName();
        this.users = canalCreationDTO.getUsers();
    }
}
