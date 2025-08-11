package com.example.interactivestorybook.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "story") // Maps this entity to "story" table
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates primary key
    private Long storyId;

    private String title;  // Title of the story
    private String author;  // Author name

    @Lob // Large text field for story content
    private String narrative;

    private LocalDate publishedDt;

    // Getters and Setters below

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

}