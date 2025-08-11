package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.Feedback;
import com.example.interactivestorybook.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Marks this as a REST API controller
@RequestMapping("/api/feedback") // Base path for feedback APIs
public class FeedbackController {

    @Autowired // Injects repository instance
    private FeedbackRepository feedbackRepository;

    @PostMapping // Handles POST requests
    public ResponseEntity<Feedback> saveFeedback(@RequestBody Feedback feedback) { // Request body mapped to Feedback
        Feedback savedFeedback = feedbackRepository.save(feedback); // Save to DB
        return ResponseEntity.ok(savedFeedback); // Return saved feedback
    }
}
