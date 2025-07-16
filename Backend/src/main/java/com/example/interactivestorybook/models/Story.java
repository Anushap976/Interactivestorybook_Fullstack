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


}
