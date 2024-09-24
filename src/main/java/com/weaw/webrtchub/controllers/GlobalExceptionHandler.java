package com.weaw.webrtchub.controllers;

import com.weaw.webrtchub.exceptions.InvalidTokenException;
import com.weaw.webrtchub.exceptions.UsernameAlreadyTakenException;
import com.weaw.webrtchub.exceptions.WrongCredentialsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UsernameAlreadyTakenException.class)
    public ResponseEntity<Object> handleUsernameAlreadyTakenException(UsernameAlreadyTakenException ex) {
        return parseMessage(ex, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(WrongCredentialsException.class)
    public ResponseEntity<Object> handleWrongCredentialsException(WrongCredentialsException ex) {
        return parseMessage(ex, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<Object> handleInvalidTokenException(InvalidTokenException ex) {
        return parseMessage(ex, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleNotManagedException(Exception ex) {
        Exception exception = new Exception("Not managed exception please contact administrator | Exception "+ex.getMessage());
        return parseMessage(exception, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<Object> parseMessage(Exception ex, HttpStatus status) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());
        LOGGER.debug(ex.getMessage());
        return new ResponseEntity<>(body, status);
    }
}
