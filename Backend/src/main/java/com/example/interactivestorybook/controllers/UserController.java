package com.example.interactivestorybook.controllers;

import com.example.interactivestorybook.models.User;
import com.example.interactivestorybook.models.UserSecurity;
import com.example.interactivestorybook.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/signup")
    @Transactional
    public String signup(@RequestBody SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return "Password and Confirm Password do not match";
        }

        boolean exists = userRepository.findAll().stream()
                .anyMatch(u -> u.getEmailId().equalsIgnoreCase(request.getEmail()));

        if (exists) {
            return "Email already registered";
        }

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmailId(request.getEmail());

        UserSecurity security = new UserSecurity();
        security.setUsername(request.getEmail());
        security.setPassword(request.getPassword());
        security.setUser(newUser);
        newUser.setUserSecurity(security);

        userRepository.save(newUser);
        return "Signup successful";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (u.getEmailId().equalsIgnoreCase(request.getEmail()) &&
                    u.getUserSecurity() != null &&
                    u.getUserSecurity().getPassword().equals(request.getPassword())) {
                return "Login successful";
            }
        }
        return "Invalid email or password";
    }

    // DTOs
    public static class SignupRequest {
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String confirmPassword;

        // Getters and Setters
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

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
