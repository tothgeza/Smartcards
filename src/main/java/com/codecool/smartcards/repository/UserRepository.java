package com.codecool.smartcards.repository;

import com.codecool.smartcards.dto.UserDTO;
import com.codecool.smartcards.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // for login and authentication
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    // for UserService -> UserController
    @Query("select new com.codecool.smartcards.dto.UserDTO(u.id, u.username, u.email) from User u")
    List<UserDTO> findAllUser();

    Optional<User> findUserById(@Param("userID") long userID);

    @Query("select new com.codecool.smartcards.dto.UserDTO(u.id, u.username, u.email) from User u" +
            " where u.id = :userID")
    Optional<UserDTO> findUserByIdDTO(@Param("userID") long userID);



//    @Query("select c from User u join u.myClasses mc" +
//            " join mc.decks d" +
//            " join d.cards c" +
//            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id" +
//            " and upper(c.question) like upper(concat('%', :question, '%'))")
//    List<Card> findCardByQuestion(@Param("id") Long id,
//                            @Param("myClass_id") Long myClass_id,
//                            @Param("deck_id") Long deck_id,
//                                  @Param("question") String question);
//
//    @Query("select c from User u join u.myClasses mc" +
//            " join mc.decks d" +
//            " join d.cards c" +
//            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id" +
//            " and upper(c.answer) like upper(concat('%', :answer, '%'))")
//    List<Card> findCardByAnswer(@Param("id") Long id,
//                                  @Param("myClass_id") Long myClass_id,
//                                  @Param("deck_id") Long deck_id,
//                                  @Param("answer") String answer);
//
//    @Query("select c from User u join u.myClasses mc" +
//            " join mc.decks d" +
//            " join d.cards c" +
//            " where u.id = :id and mc.id = :myClass_id and d.id = :deck_id" +
//            " and upper(c.question) like upper(concat('%', :keyword, '%'))" +
//            " or upper(c.answer) like upper(concat('%', :keyword, '%'))")
//    List<Card> findCardByQuestionAndAnswer(@Param("id") Long id,
//                                @Param("myClass_id") Long myClass_id,
//                                @Param("deck_id") Long deck_id,
//                                @Param("keyword") String keyword);
}
