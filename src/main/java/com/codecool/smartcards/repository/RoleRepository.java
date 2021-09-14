package com.codecool.smartcards.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codecool.smartcards.models.ERole;
import com.codecool.smartcards.models.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
