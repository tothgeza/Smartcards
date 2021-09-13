package com.codecool.Smartcards.repository;

import com.codecool.Smartcards.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
