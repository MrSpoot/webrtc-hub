package com.weaw.webrtchub.services;

import com.weaw.webrtchub.models.Token;
import com.weaw.webrtchub.repositories.TokenRepository;
import com.weaw.webrtchub.utils.AuthenticationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TokenService.class);

    private final TokenRepository tokenRepository;

    @Autowired
    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Token generateToken(String subject) {
        Token token = new Token();
        token.setToken(AuthenticationUtils.generateToken(subject));
        Token findedToken = tokenRepository.findByToken(token.getToken());
        return findedToken != null ? findedToken : tokenRepository.save(token);
    }

    public boolean validateToken(String token) {
        Token t = tokenRepository.findByToken(token);
        return t != null && AuthenticationUtils.validateToken(t.getToken());
    }

    public void deleteToken(String token) {
        Token findToken  = tokenRepository.findByToken(token);
        if(token != null){
            tokenRepository.delete(findToken);
        }
    }

}
