package com.weaw.webrtchub.configurations.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weaw.webrtchub.models.WebSocketMessage;
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
import java.time.LocalDateTime;
import java.util.*;

@Component
public class WeawWebSocketHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(WeawWebSocketHandler.class);

    private final WebSocketControllerHandler webSocketControllerHandler;
    private final ObjectMapper objectMapper;
    private final SessionService sessionService;
    private final TokenService tokenService;

    @Autowired
    public WeawWebSocketHandler(WebSocketControllerHandler webSocketControllerHandler, ObjectMapper objectMapper, SessionService sessionService, TokenService tokenService) {
        this.objectMapper = objectMapper;
        this.sessionService = sessionService;
        this.tokenService = tokenService;
        this.webSocketControllerHandler = webSocketControllerHandler;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        Long userId = checkSessionValidityAndExtractUserId(session);
        sessionService.addUserSession(userId, session);
        logger.info("Connection established [Session] [{}] [User] [{}]", session.getId(), userId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage webSocketMessage) throws Exception {
            String payload = webSocketMessage.getPayload();
        try {
            WebSocketMessage webSocketMessage1 = objectMapper.readValue(payload, WebSocketMessage.class);
            checkSessionValidityAndExtractUserId(session);

            this.webSocketControllerHandler.processWebSocketMessage(webSocketMessage1);
        }catch (Exception e) {
            throw e;
            //logger.error("Error during websocket message processing | Exception : {}",e.toString());
            //session.sendMessage(new TextMessage(parseMessage(e)));
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
            Long userId = checkSessionValidityAndExtractUserId(session);
            sessionService.removeUserSession(userId, session);
            logger.info("Connection closed [Session] [{}] [Status] [{}]", session.getId(), status);
    }

    private Long checkSessionValidityAndExtractUserId(WebSocketSession session) throws IOException {
        try {
            URI uri = session.getUri();
            assert uri != null;
            String token = parseQuery(uri.getQuery()).getOrDefault("token", null);
            if (!tokenService.validateToken(token)) {
                session.close(CloseStatus.BAD_DATA.withReason("Invalid token"));
            } else {
                return AuthenticationUtils.extractUserId(token);
            }
        } catch (Exception e) {
            session.close(CloseStatus.BAD_DATA.withReason("No token provided"));
        }
        return null;
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

    private String parseMessage(Exception ex) throws JsonProcessingException {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());
        logger.debug(ex.getMessage());
        return objectMapper.writeValueAsString(body);
    }

}
