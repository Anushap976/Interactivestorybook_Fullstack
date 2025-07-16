package com.example.interactivestorybook.models;

import jakarta.persistence.*;

@Entity
@Table(name = "story_review")
public class StoryReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Lob
    private String comments;

    // The user who wrote the review
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // The story this review belongs to
    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;

    // Parent review for nested/threaded replies
    @ManyToOne
    @JoinColumn(name = "parent_review_id")
    private StoryReview parentReview;


}
