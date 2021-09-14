package com.codecool.smartcards.repository;

import com.codecool.smartcards.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
