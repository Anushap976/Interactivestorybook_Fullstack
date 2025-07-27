package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.StoryReview;
import com.example.interactivestorybook.repositories.StoryRepository;
import com.example.interactivestorybook.repositories.StoryReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/story-reviews")
public class StoryReviewController {

    @Autowired
    public StoryReviewRepository storyReviewRepository;

    //get all reviews
    @GetMapping
    public List<StoryReview> getAllReviews() {
        return storyReviewRepository.findAll();
    }

    // GET a review by ID
    @GetMapping("/{id}")
    public ResponseEntity<StoryReview> getReviewById(@PathVariable Long id) {
        StoryReview review = storyReviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
        return ResponseEntity.ok(review);
    }

    // POST a new review
    @PostMapping
    public ResponseEntity<StoryReview> createReview(@RequestBody StoryReview storyReview) {
        StoryReview savedReview = storyReviewRepository.save(storyReview);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    // PUT update review
    @PutMapping("/{id}")
    public ResponseEntity<StoryReview> updateReview(@PathVariable Long id, @RequestBody StoryReview updatedReview) {
        StoryReview existingReview = storyReviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));

        existingReview.setRating(updatedReview.getRating());
        existingReview.setComment(updatedReview.getComment());
        existingReview.setReviewDate(updatedReview.getReviewDate());
        // You can update user or story if needed

        StoryReview saved = storyReviewRepository.save(existingReview);
        return ResponseEntity.ok(saved);
    }

    // DELETE review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        StoryReview existingReview = storyReviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));

        storyReviewRepository.delete(existingReview);
        return ResponseEntity.noContent().build();
    }
}
