package com.weaw.webrtchub.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelCreationDTO {

    private String name;
    private List<Long> users;

}
