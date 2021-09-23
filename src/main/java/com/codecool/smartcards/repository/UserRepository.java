package com.codecool.smartcards.repository;

import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.models.MyClass;
import com.codecool.smartcards.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    //    Boolean existsByEmail(String email);
    @Query("select mc from User u join u.myClasses mc where u.id = :id")
    List<MyClass> findAllMyClasses(@Param("id") Long id);

    @Query("select mc from User u join u.myClasses mc where u.id = :id and mc.id = :myClass_id")
    Optional<MyClass> findMyClass(@Param("id") Long id, @Param("myClass_id") Long myClass_id);

    @Query("select d from User u join u.myClasses mc" +
            " join mc.decks d" +
            " where u.id = :id and mc.id = :myClass_id")
    List<Deck> findAllDecks(@Param("id") Long id,
                            @Param("myClass_id") Long myClass_id);

    @Query("select d from User u join u.myClasses mc" +
            " join mc.decks d" +
            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id")
    Optional<Deck> findDeck(@Param("id") Long id,
                        @Param("myClass_id") Long myClass_id,
                        @Param("deck_id") Long deck_id);

    @Query("select c from User u join u.myClasses mc" +
            " join mc.decks d" +
            " join d.cards c" +
            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id")
    List<Card> findAllCards(@Param("id") Long id,
                            @Param("myClass_id") Long myClass_id,
                            @Param("deck_id") Long deck_id);

    @Query("select c from User u join u.myClasses mc" +
            " join mc.decks d" +
            " join d.cards c" +
            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id and c.id = :card_id")
    Optional<Card> findCard(@Param("id") Long id,
                            @Param("myClass_id") Long myClass_id,
                            @Param("deck_id") Long deck_id,
                            @Param("card_id") Long card_id);

    @Query("select c from User u join u.myClasses mc" +
            " join mc.decks d" +
            " join d.cards c" +
            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id" +
            " and upper(c.question) like upper(concat('%', :question, '%'))")
    List<Card> findCardByQuestion(@Param("id") Long id,
                            @Param("myClass_id") Long myClass_id,
                            @Param("deck_id") Long deck_id,
                                  @Param("question") String question);

    @Query("select c from User u join u.myClasses mc" +
            " join mc.decks d" +
            " join d.cards c" +
            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id" +
            " and upper(c.answer) like upper(concat('%', :answer, '%'))")
    List<Card> findCardByAnswer(@Param("id") Long id,
                                  @Param("myClass_id") Long myClass_id,
                                  @Param("deck_id") Long deck_id,
                                  @Param("answer") String answer);

    @Query("select c from User u join u.myClasses mc" +
            " join mc.decks d" +
            " join d.cards c" +
            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id" +
            " and upper(c.question) like upper(concat('%', :keyword, '%'))" +
            " or upper(c.answer) like upper(concat('%', :keyword, '%'))")
    List<Card> findCardByQuestionAndAnswer(@Param("id") Long id,
                                @Param("myClass_id") Long myClass_id,
                                @Param("deck_id") Long deck_id,
                                @Param("keyword") String keyword);
}
