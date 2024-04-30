package com.weaw.webrtchub.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weaw.webrtchub.configurations.websocket.WeawWebSocketHandler;
import com.weaw.webrtchub.enumerations.PayloadType;
import com.weaw.webrtchub.models.WebSocketMessage;
import com.weaw.webrtchub.models.payloads.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionService {

    private static final Logger logger = LoggerFactory.getLogger(SessionService.class);
    private final Map<Long, List<WebSocketSession>> userSessions = new ConcurrentHashMap<>();

    private final ObjectMapper objectMapper;

    public SessionService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<WebSocketSession> getUserSessions(Long userId) {
        logger.debug("Getting user sessions for userId: {}", userId);
        List<WebSocketSession> sessions = userSessions.get(userId);
        if (sessions == null) {
            sessions = new ArrayList<>();
        }
        return sessions;
    }

    public List<WebSocketSession> getUserSessions(List<Long> usersId) {
        logger.debug("Getting user sessions for userId: {}", usersId);
        List<WebSocketSession> sessions = new ArrayList<>();
        usersId.forEach(u -> sessions.addAll(userSessions.getOrDefault(u, Collections.emptyList()))
        );
        return sessions;
    }

    public void addUserSession(Long userId, WebSocketSession session) {
        logger.debug("Adding user session for userId: {}", userId);
        List<WebSocketSession> sessions = userSessions.get(userId);
        if (sessions == null) {
            sessions = new ArrayList<>();
        }
        sessions.add(session);
        userSessions.put(userId, sessions);
    }

    public void removeUserSession(Long userId, WebSocketSession session) {
        logger.debug("Removing user session for userId: {}", userId);
        List<WebSocketSession> sessions = userSessions.get(userId);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                userSessions.remove(userId);
            } else {
                userSessions.put(userId, sessions);
            }
        }
    }

    public void sendMessage(WebSocketSession session, Message message) {
        logger.debug("Sending message: {}", message);
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (JsonProcessingException jpe) {
            logger.error("Cannot parse message [Exception] [{}]", jpe.getMessage());
        } catch (IOException ioe) {
            logger.error("Cannot send message [Exception] [{}]", ioe.getMessage());
        }
    }

    public void sendMessage(List<WebSocketSession> sessions, Message message) {
        logger.debug("Sending message: {}", message);
        try {
            TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(message));
            sessions.forEach(session -> {
                try {
                    session.sendMessage(textMessage);
                } catch (IOException e) {
                    logger.error("Cannot send message [Exception] [{}]", e.getMessage());
                }
            });
        } catch (JsonProcessingException jpe) {
            logger.error("Cannot parse message [Exception] [{}]", jpe.getMessage());
        }
    }
}
