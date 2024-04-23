package com.weaw.webrtchub.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserLoginDTO.class);

    private String username;
    private String password;
}
