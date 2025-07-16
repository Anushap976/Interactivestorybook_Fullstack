package com.example.interactivestorybook.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String emailId;

    // One user has one security profile
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserSecurity userSecurity;

    // Reviews by this user
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<StoryReview> reviews;




}
