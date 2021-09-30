package com.codecool.smartcards.service;

import com.codecool.smartcards.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<List<User>> getAllUsers();

    ResponseEntity<User> createUser(User newUser);

    ResponseEntity<User> getUserById(long id);

    ResponseEntity<User> updateUser(long id, User updateUser);

    ResponseEntity<HttpStatus> deleteUser(long id);

    ResponseEntity<List<MyClass>> getAllClasses(long id);

    ResponseEntity<MyClass> createMyClass(long id, MyClass newMyClass);

    ResponseEntity<MyClass> getMyClassById(long myClass_id, long id);

    ResponseEntity<MyClass> updateMyClass(long id, long myClass_id, MyClass updateMyClass);

    ResponseEntity<HttpStatus> deleteMyClass(long id, long myClass_id);

    ResponseEntity<List<Deck>> getAllDecks(long id, long myClass_id);

    ResponseEntity<Deck> createDeck(long id, long myClass_id, Deck newDeck);

    ResponseEntity<Deck> getDeckById(long deck_id, long myClass_id, long id);

    ResponseEntity<Deck> updateDeck(long id, long myClass_id, long deck_id, Deck updateDeck);

    ResponseEntity<HttpStatus> deleteDeck(long id, long myClass_id, long deck_id);

    ResponseEntity<List<Card>> getAllCards(long id, long myClass_id, long deck_id, String keyword,
                                                  String question, String answer);

    ResponseEntity<Card> createCard(long id, long myClass_id, long deck_id, Card newCard);

    ResponseEntity<Card> getCard(long id, long myClass_id, long deck_id, long card_id);

    ResponseEntity<Card> updateCard(long id, long myClass_id, long deck_id, long card_id, Card updateCard);

    ResponseEntity<HttpStatus> deleteCard(long id, long myClass_id, long deck_id, long card_id);

    ResponseEntity<List<PublicDeck>> getAllDecks(String title);
}
