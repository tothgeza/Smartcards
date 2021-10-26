package com.codecool.smartcards.repository;

import com.codecool.smartcards.dto.CardDTO;
import com.codecool.smartcards.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

    @Query("select c from Card c where c.deck.id = :deckID order by c.id asc")
    List<Card> findCardByDeckId(@Param("deckID") long deckID);

    @Query("select new com.codecool.smartcards.dto.CardDTO(" +
            "c.id, c.question, c.answer, c.deck.id, c.deck.myClass.id, c.deck.myClass.user.id)" +
            " from Card c where c.deck.id = :deckID order by c.id asc")
    List<CardDTO> findCardByDeckIdDTO(@Param("deckID") long deckID);

    @Query("select c from Card c where c.id = :cardID")
    Optional<Card> findCardById(@Param("cardID") long cardID);

    @Query("select new com.codecool.smartcards.dto.CardDTO(" +
            "c.id, c.question, c.answer, c.deck.id, c.deck.myClass.id, c.deck.myClass.user.id)" +
            " from Card c where c.id = :cardID")
    Optional<CardDTO> findCardByIdDTO(@Param("cardID") long cardID);
}
