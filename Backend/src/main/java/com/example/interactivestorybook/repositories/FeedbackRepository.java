package com.example.interactivestorybook.repositories;

import com.example.interactivestorybook.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Repository to handle CRUD operations for Feedback
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // No additional methods needed for basic CRUD
}
