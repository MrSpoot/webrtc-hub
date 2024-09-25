package com.weaw.webrtchub.controllers.v1;

import com.weaw.webrtchub.exceptions.UserNotFoundException;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.dtos.LoginResponseDTO;
import com.weaw.webrtchub.models.dtos.UserCreationDTO;
import com.weaw.webrtchub.models.dtos.UserLoginDTO;
import com.weaw.webrtchub.services.AuthenticationService;
import com.weaw.webrtchub.utils.annotations.Unsecured;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication controller")
public class AuthenticationController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(path = "/signup")
    @Unsecured
    @Operation(summary = "To sign up")
    public ResponseEntity<User> signUp(@RequestBody UserCreationDTO user) {
        return ResponseEntity.ok(authenticationService.createAccount(user));
    }

    @PostMapping(path = "/signin")
    @Unsecured
    @Operation(summary = "To sign in")
    public ResponseEntity<LoginResponseDTO> signIn(@RequestBody UserLoginDTO loginDto, HttpServletResponse response) {
        LoginResponseDTO responseDTO = authenticationService.login(loginDto);

        Cookie cookie = new Cookie("token", responseDTO.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(864000);
        response.addCookie(cookie);

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping(path = "/signin/token")
    @Unsecured
    @Operation(summary = "To sign in with token")
    public ResponseEntity<LoginResponseDTO> signInWithToken(@RequestParam String token, HttpServletResponse response) throws UserNotFoundException {
        LoginResponseDTO responseDTO = authenticationService.loginWithToken(token);

        Cookie cookie = new Cookie("token", responseDTO.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(864000);
        response.addCookie(cookie);

        return ResponseEntity.ok(responseDTO);
    }


    @PostMapping(path = "/signout")
    @Operation(summary = "To sign out")
    public void signOut(@RequestBody String token) {
        authenticationService.logout(token);
    }



}
