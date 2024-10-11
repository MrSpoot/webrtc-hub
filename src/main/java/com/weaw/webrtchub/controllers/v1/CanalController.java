package com.weaw.webrtchub.controllers.v1;

import com.weaw.webrtchub.models.Channel;
import com.weaw.webrtchub.models.Message;
import com.weaw.webrtchub.models.dtos.ChannelCreationDTO;
import com.weaw.webrtchub.services.CanalService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/canals")
@Tag(name = "Canal controller")
public class CanalController {

    private final CanalService canalService;

    @Autowired
    public CanalController(CanalService canalService) {
        this.canalService = canalService;
    }

    @GetMapping()
    public ResponseEntity<Page<Channel>> getAllUserCanal(HttpServletRequest request, Pageable pageable) {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(canalService.getAllPrivateCanalsOfUser(token,pageable));
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<Page<Message>> getAllMessageByCanalId(@PathVariable String id, Pageable pageable) {
        return ResponseEntity.ok(canalService.getAllMessageByCanalId(id,pageable));
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<Message> postMessageOnCanal(@PathVariable String id, @RequestBody String message, HttpServletRequest request) {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(canalService.processMessage(id,token,message));
    }

    @PostMapping
    public ResponseEntity<Channel> savePrivateCanal(@RequestBody ChannelCreationDTO canal) {
        return ResponseEntity.ok(canalService.savePrivateCanal(canal));
    }
}
