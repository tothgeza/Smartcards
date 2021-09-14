package com.codecool.smartcards.repository;

import com.codecool.smartcards.models.PublicCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicCardRepository extends JpaRepository<PublicCard, Long> {
}