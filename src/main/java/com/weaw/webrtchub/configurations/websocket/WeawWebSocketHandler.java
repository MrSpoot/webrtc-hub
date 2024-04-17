package com.weaw.webrtchub.configurations.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weaw.webrtchub.models.WebSocketMessage;
import com.weaw.webrtchub.models.payloads.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class WeawWebSocketHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(WeawWebSocketHandler.class);
    private final Map<Long, List<WebSocketSession>> userSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished( WebSocketSession session) throws IOException {
        try {
            URI uri = session.getUri();
            assert uri != null;
            Long userId = Long.parseLong(parseQuery(uri.getQuery()).getOrDefault("userId",null));
            if (userSessions.containsKey(userId)) {
                userSessions.get(userId).add(session);
            } else {
                List<WebSocketSession> sessions = new ArrayList<>();
                sessions.add(session);
                userSessions.put(userId, sessions);
            }
            logger.info("Connection established [Session] [{}] [User] [{}]",session.getId(),userId);

        }catch (Exception e) {
            session.close(CloseStatus.BAD_DATA.withReason("No user id provided"));
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage webSocketMessage) throws Exception {

        String payload = webSocketMessage.getPayload();

        ObjectMapper mapper = new ObjectMapper();
        WebSocketMessage webSocketMessage1 = mapper.readValue(payload, WebSocketMessage.class);
        Object messagePayload = webSocketMessage1.getPayload();

        if(messagePayload instanceof Message message){
            List<WebSocketSession> sessions = userSessions.getOrDefault(message.getRecipientId(), Collections.emptyList());
            webSocketMessage1.setPayload(message);
            for(WebSocketSession recipientSession : sessions){
                recipientSession.sendMessage(new TextMessage(mapper.writeValueAsString(webSocketMessage1)));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        URI uri = session.getUri();
        assert uri != null;
        Long userId = Long.parseLong(parseQuery(uri.getQuery()).getOrDefault("userId",null));

        if (userSessions.containsKey(userId)) {
            userSessions.get(userId).remove(session);
            if (userSessions.get(userId).isEmpty()) {
                userSessions.remove(userId);
            }
        }
        logger.info("Connection closed [Session] [{}] [Status] [{}]",session.getId(),status);
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
