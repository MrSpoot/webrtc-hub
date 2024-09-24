package com.weaw.webrtchub.models;

import com.weaw.webrtchub.models.dtos.UserCreationDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstname;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastname;

    @OneToMany(mappedBy = "user")
    private List<UserFriends> friends;

    @Column(nullable = true)
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime updatedAt;

    public User(UserCreationDTO userCreationDTO) {
        this.username = userCreationDTO.getUsername();
        this.password = userCreationDTO.getPassword();
        this.email = userCreationDTO.getEmail();
        this.firstname = userCreationDTO.getFirstname();
        this.lastname = userCreationDTO.getLastname();
        this.friends = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

}
