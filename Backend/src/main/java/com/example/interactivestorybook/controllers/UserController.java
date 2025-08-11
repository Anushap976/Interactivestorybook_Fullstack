package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.User;
import com.example.interactivestorybook.models.UserSecurity;
import com.example.interactivestorybook.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserRepository userRepository;

    // --------- NEW: Safe profile lookup by email (for login -> store userId on client) ---------
    // GET /api/users/by-email?email=foo@bar.com
    @GetMapping("/by-email")
    public ResponseEntity<?> getByEmail(@RequestParam("email") String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("email is required");
        }
        return userRepository.findByEmailIdIgnoreCase(email.trim())
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of(
                        "userId", u.getUserId(),
                        "username", u.getEmailId(),
                        "firstName", u.getFirstName() == null ? "" : u.getFirstName(),
                        "lastName",  u.getLastName()  == null ? "" : u.getLastName(),
                        "emailId",   u.getEmailId()
                )))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found"));
    }    // --------- Existing endpoints (unchanged) ---------

    // Fetch all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Signup endpoint - create new user
    @PostMapping("/signup")
    @Transactional
    public String signup(@RequestBody SignupRequest request) {
        // Check if password matches confirm password
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return "Password and Confirm Password do not match";
        }

        // Check if email already exists
        boolean exists = userRepository.findAll().stream()
                .anyMatch(u -> u.getEmailId() != null && u.getEmailId().equalsIgnoreCase(request.getEmail()));

        if (exists) {
            return "Email already registered";
        }

        // Create new User
        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmailId(request.getEmail());

        // Create security details
        UserSecurity security = new UserSecurity();
        security.setUsername(request.getEmail());
        security.setPassword(request.getPassword());
        security.setUser(newUser);
        newUser.setUserSecurity(security);

        // Save user to DB
        userRepository.save(newUser);
        return "Signup successful";
    }

    // Login endpoint - validate credentials
    // NOTE: kept as plain string for backward compatibility with your frontend
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (u.getEmailId() != null
                    && u.getEmailId().equalsIgnoreCase(request.getEmail())
                    && u.getUserSecurity() != null
                    && u.getUserSecurity().getPassword() != null
                    && u.getUserSecurity().getPassword().equals(request.getPassword())) {
                return "Login successful";
            }
        }
        return "Invalid email or password";
    }

    // --------- DTOs ---------
    public static class SignupRequest {
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String confirmPassword;

        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }

        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getConfirmPassword() { return confirmPassword; }
        public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // --------- helpers ---------
    private static String nullSafe(String s) { return s == null ? "" : s; }
}
