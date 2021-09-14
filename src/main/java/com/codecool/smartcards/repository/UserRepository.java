package com.codecool.smartcards.repository;

import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select p from User u join u.decks p where u.id = :id")
    List<Deck> findAllDecks(@Param("id") Long id);

    @Query("select p from User u join u.decks p where u.id = :id and p.id = :deck_id")
    Optional<Deck> findDeck(@Param("id") Long id, @Param("deck_id") Long deck_id);

    @Query("select c from User u join u.decks p join p.cards c where u.id = :id and p.id = :deck_id")
    List<Card> findAllCards(@Param("id") Long id, @Param("deck_id") Long deck_id);

    @Query("select c from User u join u.decks p join p.cards c " +
            "where u.id = :id and p.id = :deck_id and c.id = :card_id")
    Optional<Card> findCard(@Param("id") Long id,
                            @Param("deck_id") Long deck_id,
                            @Param("card_id") Long card_id);

    @Query("select c from User u join u.decks p join p.cards c " +
            "where u.id = :id and p.id = :deck_id and upper(c.question) like upper(concat('%', :question, '%'))")
    List<Card> findCardByQuestion(@Param("id") Long id,
                                  @Param("deck_id") Long deck_id,
                                  @Param("question") String question);

    @Query("select c from User u join u.decks p join p.cards c " +
            "where u.id = :id and p.id = :deck_id and upper(c.answer) like upper(concat('%', :answer, '%'))")
    List<Card> findCardByAnswer(@Param("id") Long id,
                                @Param("deck_id") Long deck_id,
                                @Param("answer") String answer);

    @Query("select c from User u join u.decks p join p.cards c " +
            "where u.id = :id and p.id = :deck_id " +
            "and (upper(c.question) like upper(concat('%', :keyword, '%')) " +
            "or upper(c.answer) like upper(concat('%', :keyword, '%')))")
    List<Card> findCardByQuestionAndAnswer(@Param("id") Long id,
                                @Param("deck_id") Long deck_id,
                                @Param("keyword") String keyword);
}
