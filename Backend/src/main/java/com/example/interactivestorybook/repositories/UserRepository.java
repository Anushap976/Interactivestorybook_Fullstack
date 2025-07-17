package com.example.interactivestorybook.repositories;

import com.example.interactivestorybook.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
