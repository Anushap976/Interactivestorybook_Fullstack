package com.example.interactivestorybook.repositories;

import com.example.interactivestorybook.models.UserSecurity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSecurityRepository extends JpaRepository<UserSecurity, Long> {
    UserSecurity findByUsername(Long userId);
}
