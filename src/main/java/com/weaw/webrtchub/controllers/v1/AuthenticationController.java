package com.weaw.webrtchub.controllers.v1;

import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.dtos.UserCreationDTO;
import com.weaw.webrtchub.models.dtos.UserLoginDTO;
import com.weaw.webrtchub.services.AuthenticationService;
import com.weaw.webrtchub.utils.annotations.Unsecured;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(path = "/signup")
    @Unsecured
    public User signUp(@RequestBody UserCreationDTO user) {
        return authenticationService.createAccount(user);
    }

    @PostMapping(path = "/signin")
    @Unsecured
    public String signIn(@RequestBody UserLoginDTO loginDto, HttpServletResponse response) {
        String token = authenticationService.login(loginDto);

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(864000);
        response.addCookie(cookie);

        return token;
    }

    @PostMapping(path = "/signout")
    public void signOut(@RequestBody String token) {
        authenticationService.logout(token);
    }



}
