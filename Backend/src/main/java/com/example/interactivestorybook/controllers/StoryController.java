package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.Story;
import com.example.interactivestorybook.repositories.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController // Marks this as a REST API controller
@RequestMapping("/api/userstories") // Base API path for stories
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class StoryController {

    @Autowired // Injects the StoryRepository
    private StoryRepository storyRepository;

    // CREATE a new story
    @PostMapping
    public Story createStory(@RequestBody Story story) {  // Map request body to Story object
        story.setPublishedDt(LocalDate.now());  // Set current date
        return storyRepository.save(story); // Save to DB
    }

    // READ all stories
    @GetMapping
    public List<Story> getAllStories() {  // Return all stories
        return storyRepository.findAll();
    }

    // READ single story by ID
    @GetMapping("/{id}")
    public Story getStoryById(@PathVariable Long id) { // Fetch by ID
        return storyRepository.findById(id).orElse(null);
    }

    // UPDATE a story
    @PutMapping("/{id}")
    public Story updateStory(@PathVariable Long id, @RequestBody Story updatedStory) { // Update by ID
        return storyRepository.findById(id).map(story -> {
            story.setTitle(updatedStory.getTitle());
            story.setAuthor(updatedStory.getAuthor());
            story.setNarrative(updatedStory.getNarrative());
            return storyRepository.save(story); // Save changes
        }).orElse(null);
    }

    // DELETE a story
    @DeleteMapping("/{id}")
    public void deleteStory(@PathVariable Long id) {// Delete by ID
        storyRepository.deleteById(id);
    }
}