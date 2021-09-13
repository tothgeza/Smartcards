package com.codecool.Smartcards.repository;

import com.codecool.Smartcards.models.Deck;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DeckRepository extends JpaRepository<Deck, Long> {

}
