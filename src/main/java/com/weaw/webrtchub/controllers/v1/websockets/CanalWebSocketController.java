package com.weaw.webrtchub.controllers.v1.websockets;

import com.weaw.webrtchub.models.Canal;
import com.weaw.webrtchub.models.dtos.CanalCreationDTO;
import com.weaw.webrtchub.models.payloads.Message;
import com.weaw.webrtchub.services.CanalService;
import com.weaw.webrtchub.utils.annotations.WebSocketController;
import com.weaw.webrtchub.utils.annotations.methods.POST;
import org.springframework.beans.factory.annotation.Autowired;

@WebSocketController(path = "canal")
public class CanalWebSocketController {

    private final CanalService canalService;

    @Autowired
    public CanalWebSocketController(CanalService canalService) {
        this.canalService = canalService;
    }

    @POST
    public Canal createCanal(CanalCreationDTO canal){
        return canalService.save(canal);
    }

    @POST(path = "/message")
    public Message sendMessage(Message message){
        return canalService.processMessage(message);
    }


}
