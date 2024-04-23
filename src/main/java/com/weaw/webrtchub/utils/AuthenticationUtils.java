package com.weaw.webrtchub.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

public class AuthenticationUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationUtils.class);

    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Base64.getDecoder().decode(System.getenv("GATEWAY_SECRET_KEY")));

    static {
        LOGGER.debug("JWT Secret key {}", SECRET_KEY);
    }

    public static String hashPassword(String plainTextPassword) {
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }

    public static boolean checkPassword(String plainTextPassword, String hashedPassword) {
        return BCrypt.checkpw(plainTextPassword, hashedPassword);
    }

    public static boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }


    public static String generateToken(String subject){
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        long expMillis = nowMillis + 3600000; // Le token expire dans une heure
        Date exp = new Date(expMillis);

        return Jwts.builder()
                .subject(subject)
                .issuedAt(now)
                .expiration(exp)
                .signWith(SECRET_KEY)
                .compact();
    }
}
