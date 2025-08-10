package com.example.interactivestorybook.repositories;
import com.example.interactivestorybook.models.Story;
import com.example.interactivestorybook.models.StoryReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryReviewRepository extends JpaRepository<StoryReview, Long> {
    List<StoryReview> findByStory(Story story);
//    List<StoryReview> findByStory_Id(Long storyId);
}
