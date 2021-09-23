package com.codecool.smartcards.repository;

import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.models.MyClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MyClassRepository extends JpaRepository<MyClass, Long> {

    @Query("select p from MyClass m join m.decks p where m.id = :id")
    List<Deck> findAllDecks(@Param("id") Long id);
}
