package com.codecool.smartcards.repository;

import com.codecool.smartcards.dto.PublicDeckDTO;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.models.PublicDeck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PublicDeckRepository extends JpaRepository<PublicDeck, Long> {
    List<PublicDeck> findByTitleContainingIgnoreCase(String title);

    @Query("select" +
            " new com.codecool.smartcards.dto.PublicDeckDTO(d.id, d.title, d.isPublic)" +
            " from PublicDeck d order by d.id asc")
    List<PublicDeckDTO> findAllPublicDeck();

    @Query("select d from PublicDeck d where d.id = :deckID")
    Optional<PublicDeck> findPublicDeckById(@Param("deckID") long deckID);

    @Query("select" +
            " new com.codecool.smartcards.dto.PublicDeckDTO(d.id, d.title, d.isPublic)" +
            " from PublicDeck d" +
            " where  d.id = :deckID")
    Optional<PublicDeckDTO> findPublicDeckByIdDTO(@Param("deckID") long deckID);
}