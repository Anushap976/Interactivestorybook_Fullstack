package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.UserSecurity;
import com.example.interactivestorybook.repositories.UserSecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-security")
@CrossOrigin(origins = "*") // Allow requests from any origin (CORS)
public class UserSecurityController {

        @Autowired
        private UserSecurityRepository userSecurityRepository;

        // Get all user security records
        @GetMapping
        public List<UserSecurity> getAllUserSecurity() {
            return userSecurityRepository.findAll();
        }

        // Get a specific user security by ID
        @GetMapping("/{id}")
        public ResponseEntity<UserSecurity> getById(@PathVariable Long id) {
            Optional<UserSecurity> security = userSecurityRepository.findById(id);
            return security.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }

        // Create a new user security record
        @PostMapping
        public UserSecurity createUserSecurity(@RequestBody UserSecurity userSecurity) {
            return userSecurityRepository.save(userSecurity);
        }

        // Update user security
        @PutMapping("/{id}")
        public ResponseEntity<UserSecurity> updateUserSecurity(@PathVariable Long id, @RequestBody UserSecurity updated) {
            return userSecurityRepository.findById(id).map(existing -> {
                existing.setUsername(updated.getUsername());
                existing.setPassword(updated.getPassword());
                existing.setUser(updated.getUser());
                return ResponseEntity.ok(userSecurityRepository.save(existing));
            }).orElseGet(() -> ResponseEntity.notFound().build());
        }

        // Delete user security
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUserSecurity(@PathVariable Long id) {
            UserSecurity userSecurity = userSecurityRepository.findById(id).orElse(null);

            if (userSecurity == null) {
                return ResponseEntity.notFound().build();
            }

            userSecurityRepository.delete(userSecurity);
            return ResponseEntity.ok().build();
        }

    }
