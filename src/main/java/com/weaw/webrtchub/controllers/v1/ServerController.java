package com.weaw.webrtchub.controllers.v1;

import com.weaw.webrtchub.models.Server;
import com.weaw.webrtchub.models.dtos.ServerCreationDTO;
import com.weaw.webrtchub.models.dtos.ServerResponseDTO;
import com.weaw.webrtchub.services.ServerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/servers")
@Tag(name = "Server controller")
public class ServerController {

    public final ServerService serverService;

    @Autowired
    public ServerController(ServerService serverService) {
        this.serverService = serverService;
    }

    @GetMapping
    public ResponseEntity<List<ServerResponseDTO>> getUserServer(HttpServletRequest request) {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(serverService.getUserServer(token));
    }

    @PostMapping
    public ResponseEntity<ServerResponseDTO> createServer(ServerCreationDTO serverCreationDTO,HttpServletRequest request) {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(serverService.createNewServer(token,serverCreationDTO));
    }

}
