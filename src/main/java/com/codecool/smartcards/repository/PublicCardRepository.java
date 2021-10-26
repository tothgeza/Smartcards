package com.codecool.smartcards.repository;

import com.codecool.smartcards.dto.PublicCardDTO;
import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.models.PublicCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PublicCardRepository extends JpaRepository<PublicCard, Long> {

    @Query("select c from Card c where c.deck.id = :deckID order by c.id asc")
    List<PublicCard> findPublicCardByDeckId(@Param("deckID") long deckID);

    @Query("select new com.codecool.smartcards.dto.PublicCardDTO" +
            "(c.id, c.question, c.answer, c.deck.id)" +
            " from Card c where c.deck.id = :deckID order by c.id asc")
    List<PublicCardDTO> findPublicCardByDeckIdDTO(@Param("deckID") long deckID);

    @Query("select c from Card c where c.id = :cardID")
    Optional<Card> findPublicCardById(@Param("cardID") long cardID);

    @Query("select new com.codecool.smartcards.dto.PublicCardDTO(" +
            "c.id, c.question, c.answer, c.deck.id)" +
            " from Card c where c.id = :cardID")
    Optional<PublicCardDTO> findPublicCardByIdDTO(@Param("cardID") long cardID);
}