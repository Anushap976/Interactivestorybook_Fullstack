package com.example.interactivestorybook.controllers;


import com.example.interactivestorybook.models.Story;
import com.example.interactivestorybook.repositories.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    StoryRepository storyRepository;

    @GetMapping
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    @GetMapping("/{id}")
    public Story getStoryById(@PathVariable Long id) {
        return storyRepository.findById(id).orElseThrow(() -> new RuntimeException("Story not found"));
    }

    @PostMapping
    public Story createStory(@RequestBody Story story) {
        return storyRepository.save(story);
    }

    @PutMapping("/{id}")
    public Story updateStory(@PathVariable Long id, @RequestBody Story storyDetails) {
        Story story = storyRepository.findById(id).orElseThrow(() -> new RuntimeException("Story not found"));
        story.setTitle(storyDetails.getTitle());
        story.setAuthor(storyDetails.getAuthor());
        story.setNarrative(storyDetails.getNarrative());
        story.setPublishedDt(storyDetails.getPublishedDt());
        return storyRepository.save(story);
    }

    @DeleteMapping("/{id}")
    public void deleteStory(@PathVariable Long id) {
        storyRepository.deleteById(id);
    }
}
