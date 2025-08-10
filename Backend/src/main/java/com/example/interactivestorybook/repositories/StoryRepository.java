package com.example.interactivestorybook.repositories;
import java.util.Optional;
import com.example.interactivestorybook.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
    Optional<Story> findByTitleIgnoreCase(String title);
}
