package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.Story;
import com.example.interactivestorybook.repositories.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/userstories")
@CrossOrigin(origins = "http://localhost:3000")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    // CREATE a new story
    @PostMapping
    public Story createStory(@RequestBody Story story) {
        story.setPublishedDt(LocalDate.now());
        return storyRepository.save(story);
    }

    // READ all stories
    @GetMapping
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    // READ single story by ID
    @GetMapping("/{id}")
    public Story getStoryById(@PathVariable Long id) {
        return storyRepository.findById(id).orElse(null);
    }

    // UPDATE a story
    @PutMapping("/{id}")
    public Story updateStory(@PathVariable Long id, @RequestBody Story updatedStory) {
        return storyRepository.findById(id).map(story -> {
            story.setTitle(updatedStory.getTitle());
            story.setAuthor(updatedStory.getAuthor());
            story.setNarrative(updatedStory.getNarrative());
            return storyRepository.save(story);
        }).orElse(null);
    }

    // DELETE a story
    @DeleteMapping("/{id}")
    public void deleteStory(@PathVariable Long id) {
        storyRepository.deleteById(id);
    }
}
