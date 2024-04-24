package com.weaw.webrtchub.models.payloads;

import com.weaw.webrtchub.enumerations.HttpMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrudPayload {

    private String path;
    private HttpMethod method;
    private String body;

}
