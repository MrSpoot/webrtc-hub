package com.weaw.webrtchub.configurations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.weaw.webrtchub.configurations.websocket.WebSocketControllerHandler;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class BeanConfiguration {

    private static final DateTimeFormatter datePattern = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSSS");

    private final ApplicationContext applicationContext;
    private ObjectMapper objectMapper;

    @Autowired
    public BeanConfiguration(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(datePattern));

        objectMapper.registerModule(javaTimeModule);

        this.objectMapper = objectMapper;

        return objectMapper;
    }

    @Bean
    public WebSocketControllerHandler webSocketControllerHandler() {
        return new WebSocketControllerHandler(applicationContext,objectMapper);
    }

    @Bean
    public GroupedOpenApi v1Api() {
        return GroupedOpenApi.builder()
                .group("v1")
                .pathsToMatch("/api/v1/**")
                .build();
    }

}
