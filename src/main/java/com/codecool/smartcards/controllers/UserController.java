package com.codecool.smartcards.controllers;

import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.models.MyClass;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.models.PublicDeck;
import com.codecool.smartcards.models.User;
import com.codecool.smartcards.repository.*;
import com.codecool.smartcards.service.UserService;
import com.codecool.smartcards.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final PublicDeckRepository publicDeckRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository,
                          PublicDeckRepository publicDeckRepository,
                          UserServiceImpl userServiceImpl) {
        this.userRepository = userRepository;
        this.publicDeckRepository = publicDeckRepository;
        this.userService = userServiceImpl;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        return userService.createUser(newUser);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User updateUser) {
        return userService.updateUser(id, updateUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        return userService.deleteUser(id);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/{id}/classes")
    public ResponseEntity<List<MyClass>> getAllClasses(@PathVariable("id") long id) {
        return userService.getAllClasses(id);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/users/{id}/classes")
    public ResponseEntity<MyClass> createMyClass(@PathVariable("id") long id,
                                           @RequestBody MyClass newMyClass) {
        return userService.createMyClass(id, newMyClass);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/{id}/classes/{myClass_id}")
    public ResponseEntity<MyClass> getMyClassById(@PathVariable("myClass_id") long myClass_id,
                                            @PathVariable("id") long id) {
        return userService.getMyClassById(myClass_id, id);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/users/{id}/classes/{myClass_id}")
    public ResponseEntity<MyClass> updateMyClass(@PathVariable("id") long id,
                                           @PathVariable("myClass_id") long myClass_id,
                                           @RequestBody MyClass updateMyClass) {
        return userService.updateMyClass(id, myClass_id, updateMyClass);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/users/{id}/classes/{myClass_id}")
    public ResponseEntity<HttpStatus> deleteMyClass(@PathVariable("id") long id,
                                                 @PathVariable("myClass_id") long myClass_id) {
        return userService.deleteMyClass(id, myClass_id);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/{id}/classes/{myClass_id}/decks")
    public ResponseEntity<List<Deck>> getAllDecks(@PathVariable("id") long id,
                                                  @PathVariable("myClass_id") long myClass_id) {
        return userService.getAllDecks(id, myClass_id);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/users/{id}/classes/{myClass_id}/decks")
    public ResponseEntity<Deck> createDeck(@PathVariable("id") long id,
                                           @PathVariable("myClass_id") long myClass_id,
                                           @RequestBody Deck newDeck) {
        return userService.createDeck(id, myClass_id, newDeck);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}")
    public ResponseEntity<Deck> getDeckById(@PathVariable("deck_id") long deck_id,
                                            @PathVariable("myClass_id") long myClass_id,
                                            @PathVariable("id") long id) {
        return userService.getDeckById(deck_id, myClass_id, id);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}")
    public ResponseEntity<Deck> updateDeck(@PathVariable("id") long id,
                                           @PathVariable("myClass_id") long myClass_id,
                                           @PathVariable("deck_id") long deck_id,
                                           @RequestBody Deck updateDeck) {
        return userService.updateDeck(id, myClass_id, deck_id, updateDeck);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}")
    public ResponseEntity<HttpStatus> deleteDeck(@PathVariable("id") long id,
                                                 @PathVariable("myClass_id") long myClass_id,
                                                 @PathVariable("deck_id") long deck_id) {
        return userService.deleteDeck(id, myClass_id, deck_id);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}/cards")
    public ResponseEntity<List<Card>> getAllCards(@PathVariable("id") long id,
                                                  @PathVariable("myClass_id") long myClass_id,
                                                  @PathVariable("deck_id") long deck_id,
                                                  @RequestParam(required = false) String keyword,
                                                  String question, String answer) {
        try {
            List<Card> cards = new ArrayList<>();
            if (keyword != null) {
                cards.addAll(userRepository.findCardByQuestionAndAnswer(id, myClass_id, deck_id, keyword));
            } else if (question != null) {
                cards.addAll(userRepository.findCardByQuestion(id, myClass_id, deck_id, question));
            } else if (answer != null){
                cards.addAll(userRepository.findCardByAnswer(id, myClass_id, deck_id, answer));
            } else {
                cards.addAll(userRepository.findAllCards(id, myClass_id, deck_id));
            }
            if (cards.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(cards, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}/cards")
    public ResponseEntity<Card> createCard(@PathVariable("id") long id,
                                           @PathVariable("myClass_id") long myClass_id,
                                           @PathVariable("deck_id") long deck_id,
                                           @RequestBody Card newCard) {
        return userService.createCard(id, myClass_id, deck_id, newCard);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}/cards/{card_id}")
    public ResponseEntity<Card> getCard(@PathVariable("id") long id,
                                        @PathVariable("myClass_id") long myClass_id,
                                        @PathVariable("deck_id") long deck_id,
                                        @PathVariable("card_id") long card_id) {
        return userService.getCard(id,myClass_id, deck_id, card_id);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}/cards/{card_id}")
    public ResponseEntity<Card> updateCard(@PathVariable("id") long id,
                                           @PathVariable("myClass_id") long myClass_id,
                                           @PathVariable("deck_id") long deck_id,
                                           @PathVariable("card_id") long card_id,
                                           @RequestBody Card updateCard) {
        return userService.updateCard(id, myClass_id, deck_id, card_id,updateCard);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/users/{id}/classes/{myClass_id}/decks/{deck_id}/cards/{card_id}")
    public ResponseEntity<HttpStatus> deleteCard(@PathVariable("id") long id,
                                                 @PathVariable("myClass_id") long myClass_id,
                                                 @PathVariable("deck_id") long deck_id,
                                                 @PathVariable("card_id") long card_id) {
        return userService.deleteCard(id, myClass_id, deck_id, card_id);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/published")
    public ResponseEntity<List<PublicDeck>> getAllDecks(@RequestParam(required = false) String title) {
        try {
            List<PublicDeck> decks = new ArrayList<>();
            if (title == null)
                decks.addAll(publicDeckRepository.findAll());
            else
                decks.addAll(publicDeckRepository.findByTitleContainingIgnoreCase(title));
            if (decks.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(decks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
