package com.weaw.webrtchub.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CanalCreationDTO {

    private String name;
    private List<Long> users;

}
