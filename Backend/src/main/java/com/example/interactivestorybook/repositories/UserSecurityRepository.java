package com.example.interactivestorybook.repositories;

import com.example.interactivestorybook.models.UserSecurity;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for UserSecurity entity
public interface UserSecurityRepository extends JpaRepository<UserSecurity, Long> {
}
