package com.example.interactivestorybook.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generated ID
    private Long userId;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String emailId;

    // One user has one security profile
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserSecurity userSecurity;

    // Reviews by this user
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<StoryReview> reviews;

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public UserSecurity getUserSecurity() {
        return userSecurity;
    }

    public void setUserSecurity(UserSecurity userSecurity) {
        this.userSecurity = userSecurity;
    }

//    public List<StoryReview> getReviews() {
//        return reviews;
//    }
//
//    public void setReviews(List<StoryReview> reviews) {
//        this.reviews = reviews;
//    }


}
