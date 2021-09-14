package com.codecool.smartcards.repository;

import com.codecool.smartcards.models.Deck;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DeckRepository extends JpaRepository<Deck, Long> {

}
