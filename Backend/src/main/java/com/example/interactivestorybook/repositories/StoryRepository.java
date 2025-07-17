package com.example.interactivestorybook.repositories;

import com.example.interactivestorybook.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
