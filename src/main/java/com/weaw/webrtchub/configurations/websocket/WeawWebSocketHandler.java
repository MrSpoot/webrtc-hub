package com.weaw.webrtchub.configurations.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weaw.webrtchub.models.WebSocketMessage;
import com.weaw.webrtchub.models.payloads.Message;
import com.weaw.webrtchub.services.CanalService;
import com.weaw.webrtchub.services.MessageService;
import com.weaw.webrtchub.services.SessionService;
import com.weaw.webrtchub.services.TokenService;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.*;

@Component
public class WeawWebSocketHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(WeawWebSocketHandler.class);

    private final ObjectMapper objectMapper;
    private final SessionService sessionService;
    private final CanalService canalService;
    private final TokenService tokenService;

    @Autowired
    public WeawWebSocketHandler(ObjectMapper objectMapper, SessionService sessionService,CanalService canalService,TokenService tokenService) {
        this.objectMapper = objectMapper;
        this.sessionService = sessionService;
        this.canalService = canalService;
        this.tokenService = tokenService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        try {
            URI uri = session.getUri();
            assert uri != null;
            String token = parseQuery(uri.getQuery()).getOrDefault("token",null);
            if(tokenService.validateToken(token)){
                Long userId = AuthenticationUtils.extractUserId(token);
                sessionService.addUserSession(userId, session);
                logger.info("Connection established [Session] [{}] [User] [{}]",session.getId(),userId);
            }else{
                session.close(CloseStatus.BAD_DATA.withReason("Invalid token"));
            }
        }catch (Exception e) {
            session.close(CloseStatus.BAD_DATA.withReason("No token provided"));
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage webSocketMessage) throws Exception {

        String payload = webSocketMessage.getPayload();

        WebSocketMessage webSocketMessage1 = objectMapper.readValue(payload, WebSocketMessage.class);
        Object messagePayload = webSocketMessage1.getPayload();

        if(messagePayload instanceof Message message){
            canalService.processMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        URI uri = session.getUri();
        assert uri != null;
        String token = parseQuery(uri.getQuery()).getOrDefault("token",null);
        if(token != null){
            Long userId = AuthenticationUtils.extractUserId(token);
            sessionService.removeUserSession(userId, session);
            logger.info("Connection closed [Session] [{}] [Status] [{}]",session.getId(),status);
        }
    }

    private Map<String, String> parseQuery(String query) {
        Map<String, String> queryParams = new HashMap<>();

        if (query != null) {
            String[] pairs = query.split("&");
            for (String pair : pairs) {
                String[] keyValue = pair.split("=");
                if (keyValue.length == 2) {
                    String key = keyValue[0];
                    String value = keyValue[1];
                    queryParams.put(key, value);
                }
            }
        }
        return queryParams;
    }

}
