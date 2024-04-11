package com.weaw.webrtchub.configurations.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WeawWebSocketHandler extends TextWebSocketHandler {


    private static final Logger logger = LoggerFactory.getLogger(WeawWebSocketHandler.class);
    private final Map<String, List<WebSocketSession>> userSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {

        for(String key : session.getAttributes().keySet()) {
            logger.info("Key : "+key);
        }
        String userId = session.getUri()

        if(userSessions.containsKey(userId)) {
            userSessions.get(userId).add(session);
        }else {
            List<WebSocketSession> sessions = new ArrayList<>();
            sessions.add(session);
            userSessions.put(userId, sessions);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        /*// Exemple de traitement d'un message entrant et envoi à un utilisateur spécifique
        // Supposons que le message contient un objet JSON avec le format {"toUserId": "xxx", "content": "Hello"}
        JSONObject msg = new JSONObject(message.getPayload());
        String toUserId = msg.getString("toUserId");
        String content = msg.getString("content");

        WebSocketSession toUserSession = userSessions.get(toUserId);
        if (toUserSession != null && toUserSession.isOpen()) {
            toUserSession.sendMessage(new TextMessage(content));
        } else {
            // Gérer le cas où l'utilisateur n'est pas connecté / la session n'est pas ouverte
        }*/
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        if(userSessions.containsKey(session.getId())) {
            userSessions.get(session.getId()).remove(session);
            if(userSessions.get(session.getId()).isEmpty()) {
                userSessions.remove(session.getId());
            }
        }
    }

}
