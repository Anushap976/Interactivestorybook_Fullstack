package com.example.interactivestorybook.models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_security")
public class UserSecurity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long securityId;

    private String password;
    private boolean enabled;
    private boolean tempLocked;

    // One security profile belongs to one user
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;



}
