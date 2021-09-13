package com.codecool.Smartcards.repository;

import com.codecool.Smartcards.models.PublicDeck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublicDeckRepository extends JpaRepository<PublicDeck, Long> {
    List<PublicDeck> findByTitleContainingIgnoreCase(String title);
}