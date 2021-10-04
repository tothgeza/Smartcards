package com.codecool.smartcards.service;

import com.codecool.smartcards.dto.UserDTO;
import com.codecool.smartcards.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<List<UserDTO>> getAllUsers();

    ResponseEntity<UserDTO> createUser(User newUser);

    ResponseEntity<UserDTO> getUserById(long id);

    ResponseEntity<UserDTO> updateUser(long id, User updateUser);

    ResponseEntity<HttpStatus> deleteUser(long id);

//    ResponseEntity<List<Card>> getAllCards(long id, long myClass_id, long deck_id, String keyword,
//                                                  String question, String answer);
//
//    ResponseEntity<Card> createCard(long id, long myClass_id, long deck_id, Card newCard);
//
//    ResponseEntity<Card> getCard(long id, long myClass_id, long deck_id, long card_id);
//
//    ResponseEntity<Card> updateCard(long id, long myClass_id, long deck_id, long card_id, Card updateCard);
//
//    ResponseEntity<HttpStatus> deleteCard(long id, long myClass_id, long deck_id, long card_id);
//
//    ResponseEntity<List<PublicDeck>> getAllDecks(String title);
}
