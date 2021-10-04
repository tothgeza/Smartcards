package com.codecool.smartcards.repository;

import com.codecool.smartcards.dto.DeckDTO;
import com.codecool.smartcards.models.Deck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface DeckRepository extends JpaRepository<Deck, Long> {

    @Query("select" +
            " new com.codecool.smartcards.dto.DeckDTO(d.id, d.title, d.isPublic, d.myClass.id, d.myClass.user.id)" +
            " from Deck d where d.myClass.id = :myClassID order by d.id asc")
    List<DeckDTO> findDeckByMyClassIdDTO(@Param("myClassID") long myClassID);

    @Query("select d from Deck d where d.id = :deckID")
    Optional<Deck> findDeckById(@Param("deckID") long deckID);

    @Query("select" +
            " new com.codecool.smartcards.dto.DeckDTO(d.id, d.title, d.isPublic, d.myClass.id, d.myClass.user.id)" +
            " from Deck d" +
            " where  d.id = :deckID")
    Optional<DeckDTO> findDeckByIdDTO(@Param("deckID") long deckID);

}
