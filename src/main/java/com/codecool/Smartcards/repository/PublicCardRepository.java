package com.codecool.Smartcards.repository;

import com.codecool.Smartcards.models.PublicCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicCardRepository extends JpaRepository<PublicCard, Long> {
}