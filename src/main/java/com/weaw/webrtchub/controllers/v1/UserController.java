package com.weaw.webrtchub.controllers.v1;

import com.weaw.webrtchub.exceptions.FriendShipAlreadyExistException;
import com.weaw.webrtchub.exceptions.UserNotFoundException;
import com.weaw.webrtchub.models.User;
import com.weaw.webrtchub.models.dtos.UserFriendsResponseDTO;
import com.weaw.webrtchub.models.projections.Profile;
import com.weaw.webrtchub.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User controller")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/profile")
    public ResponseEntity<Profile> getUserProfile(@RequestParam String email) {
        return ResponseEntity.ok(userService.getUserProfile(email));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<Profile> getUserProfileById(@PathVariable Long id) throws UserNotFoundException {
        return ResponseEntity.ok(userService.getUserProfileById(id));
    }

    @PostMapping("/profiles/by-ids")
    public ResponseEntity<List<Profile>> getUserProfilesByIds(@RequestBody List<Long> ids) {
        return ResponseEntity.ok(userService.getUserProfiles(ids));
    }

    @PostMapping("/friends")
    public ResponseEntity<UserFriendsResponseDTO> addFriend(@RequestParam long friendId, HttpServletRequest request) throws UserNotFoundException, FriendShipAlreadyExistException {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(new UserFriendsResponseDTO(userService.addFriend(token,friendId)));
    }

    @DeleteMapping("/friends/{id}")
    public ResponseEntity<?> removeFriend(@RequestParam long id, HttpServletRequest request) {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(userService.removeFriend(token,id));
    }

    @PostMapping("/friends/{id}/respond")
    public ResponseEntity<UserFriendsResponseDTO> addFriend(@PathVariable long id, @RequestParam(defaultValue = "false") Boolean accepted, HttpServletRequest request) throws UserNotFoundException, FriendShipAlreadyExistException {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(new UserFriendsResponseDTO(userService.respondToFriendRequest(token,id,accepted)));
    }

    @GetMapping("/friends")
    public ResponseEntity<List<UserFriendsResponseDTO>> getUserFriends(HttpServletRequest request) throws UserNotFoundException {
        String token = request.getAttribute("token").toString();
        return ResponseEntity.ok(userService.getUserFriends(token).stream().map(UserFriendsResponseDTO::new).toList());
    }

}
