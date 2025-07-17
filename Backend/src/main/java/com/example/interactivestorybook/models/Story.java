package com.example.interactivestorybook.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "story")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyId;

    private String title;
    private String author;

    @Lob
    private String narrative;

    private LocalDate publishedDt;

    // Reviews for this story
    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    private List<StoryReview> reviews;

    // Getters and Setters

    public Long getStoryId() {
        return storyId;
    }

    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getNarrative() {
        return narrative;
    }

    public void setNarrative(String narrative) {
        this.narrative = narrative;
    }

    public LocalDate getPublishedDt() {
        return publishedDt;
    }

    public void setPublishedDt(LocalDate publishedDt) {
        this.publishedDt = publishedDt;
    }

    public List<StoryReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<StoryReview> reviews) {
        this.reviews = reviews;
    }

}
