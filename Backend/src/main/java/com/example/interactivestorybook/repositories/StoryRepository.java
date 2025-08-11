package com.example.interactivestorybook.repositories;
import java.util.Optional;
import com.example.interactivestorybook.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for Story entity
public interface StoryRepository extends JpaRepository<Story, Long> {
    // Custom query method to find a story by title (case-insensitive)
    Optional<Story> findByTitleIgnoreCase(String title);
}
