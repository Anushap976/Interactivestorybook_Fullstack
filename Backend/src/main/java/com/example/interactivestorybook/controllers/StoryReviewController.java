package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.Story;
import com.example.interactivestorybook.models.StoryReview;
import com.example.interactivestorybook.repositories.StoryRepository;
import com.example.interactivestorybook.repositories.StoryReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5175") // allow your frontend dev server
@RestController
@RequestMapping("/api/story-reviews")
public class StoryReviewController {

    private final StoryReviewRepository storyReviewRepository;
    private final StoryRepository storyRepository;

    @Autowired
    public StoryReviewController(StoryReviewRepository storyReviewRepository,
                                 StoryRepository storyRepository) {
        this.storyReviewRepository = storyReviewRepository;
        this.storyRepository = storyRepository;
    }

    // GET all or filter by storyId: /api/story-reviews?storyId=123
    @GetMapping
    public List<StoryReview> getReviews(@RequestParam(value = "storyId", required = false) Long storyId) {
        if (storyId == null) {
            return storyReviewRepository.findAll();
        }
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("Story not found: " + storyId));
        return storyReviewRepository.findByStory(story);    }

    // GET a review by ID
    @GetMapping("/{id}")
    public ResponseEntity<StoryReview> getReviewById(@PathVariable Long id) {
        StoryReview review = storyReviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
        return ResponseEntity.ok(review);
    }

    // POST a new review (expects { "storyId": 1, "comment": "Nice!" } )
    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody Map<String, Object> body) {
        if (body == null || !body.containsKey("comment")) {
            return ResponseEntity.badRequest().body("Required: comment, and either storyId or title");
        }

        // Parse inputs
        Long storyId = null;
        if (body.containsKey("storyId") && body.get("storyId") != null) {
            try {
                storyId = ((Number) body.get("storyId")).longValue();
            } catch (Exception ignored) {}
        }
        String title = null;
        if (body.containsKey("title") && body.get("title") != null) {
            title = String.valueOf(body.get("title")).trim();
            if (title.isEmpty()) title = null;
        }
        String comment = String.valueOf(body.get("comment")).trim();
        if (comment.isEmpty()) return ResponseEntity.badRequest().body("comment is empty");

        // Resolve Story WITHOUT lambdas (avoids "effectively final" issue)
        Story story = null;
        if (storyId != null) {
            story = storyRepository.findById(storyId).orElse(null);
            if (story == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Story not found: " + storyId);
            }
        } else if (title != null) {
            story = storyRepository.findByTitleIgnoreCase(title).orElse(null);
            if (story == null) {
                // Auto-create minimal story when only a title is provided
                story = new Story();
                story.setTitle(title);
                story.setAuthor("System");
                story.setNarrative("");
                story = storyRepository.save(story);
            }
        } else {
            return ResponseEntity.badRequest().body("Provide either storyId or title");
        }

        // Save review
        StoryReview review = new StoryReview();
        review.setStory(story);
        review.setComment(comment);

        if (body.containsKey("rating") && body.get("rating") != null) {
            try { review.setRating(((Number) body.get("rating")).intValue()); } catch (Exception ignored) {}
        }

        StoryReview saved = storyReviewRepository.save(review);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    // PUT update review (allows updating comment and rating)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        StoryReview existing = storyReviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));

        if (body.containsKey("comment")) {
            String comment = String.valueOf(body.get("comment")).trim();
            if (comment.isEmpty()) {
                return ResponseEntity.badRequest().body("comment is empty");
            }
            existing.setComment(comment);
        }
        if (body.containsKey("rating")) {
            try { existing.setRating(((Number) body.get("rating")).intValue()); } catch (Exception ignored) {}
        }

        StoryReview saved = storyReviewRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    // DELETE review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        StoryReview existing = storyReviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
        storyReviewRepository.delete(existing);
        return ResponseEntity.noContent().build();
    }
}
