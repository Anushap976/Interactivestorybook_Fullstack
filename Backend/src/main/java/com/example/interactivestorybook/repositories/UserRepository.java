package com.example.interactivestorybook.repositories;

import com.example.interactivestorybook.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for User entity
public interface UserRepository extends JpaRepository<User, Long> {
}
