package com.weaw.webrtchub.controllers.v1.websockets;

import com.weaw.webrtchub.services.CanalService;
import com.weaw.webrtchub.utils.annotations.WebSocketController;
import com.weaw.webrtchub.utils.annotations.methods.DELETE;
import com.weaw.webrtchub.utils.annotations.methods.GET;
import com.weaw.webrtchub.utils.annotations.methods.POST;
import com.weaw.webrtchub.utils.annotations.methods.PUT;
import org.springframework.beans.factory.annotation.Autowired;

@WebSocketController(path = "canal")
public class CanalWebSocketController {

    private final CanalService canalService;

    @Autowired
    public CanalWebSocketController(CanalService canalService) {
        this.canalService = canalService;
    }

    @GET
    public void testGet(){

    }

    @POST
    public void testPost(){

    }

    @PUT
    public void testPut(){

    }

    @DELETE
    public void testDelete(){

    }


}
