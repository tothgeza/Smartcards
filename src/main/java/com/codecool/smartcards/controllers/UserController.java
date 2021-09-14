package com.codecool.smartcards.controllers;

import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.models.PublicDeck;
import com.codecool.smartcards.models.User;
import com.codecool.smartcards.repository.CardRepository;
import com.codecool.smartcards.repository.DeckRepository;
import com.codecool.smartcards.repository.PublicDeckRepository;
import com.codecool.smartcards.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final DeckRepository deckRepository;
    private final PublicDeckRepository publicDeckRepository;
    private final CardRepository cardRepository;

    @Autowired
    public UserController(UserRepository userRepository, DeckRepository deckRepository, PublicDeckRepository publicDeckRepository, CardRepository cardRepository) {
        this.userRepository = userRepository;
        this.deckRepository = deckRepository;
        this.publicDeckRepository = publicDeckRepository;
        this.cardRepository = cardRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = new ArrayList<>(userRepository.findAll());
            if (users.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        try {
            User user = userRepository.save(newUser);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);
        return userData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User updateUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updateUser.getUsername());
                    user.setEmail(updateUser.getEmail());
                    return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*@Secured("ROLE_USER")*/
    @GetMapping("/users/{id}/decks")
    public ResponseEntity<List<Deck>> getAllDecks(@PathVariable("id") long id) {
        try {
            List<Deck> decks = new ArrayList<>(userRepository.findAllDecks(id));
            if (decks.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(decks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users/{id}/decks")
    public ResponseEntity<Deck> createDeck(@PathVariable("id") long id,
                                              @RequestBody Deck newDeck) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User user = userData.get();
            user.addDeck(newDeck);
            try {
                Deck _deck = deckRepository.save(newDeck);
                return new ResponseEntity<>(_deck, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/{id}/decks/{deck_id}")
    public ResponseEntity<Deck> getDeckById(@PathVariable("deck_id") long deck_id,
                                               @PathVariable("id") long id) {
        Optional<Deck> deckData = userRepository.findDeck(id, deck_id);
        return deckData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PutMapping("/users/{id}/decks/{deck_id}")
    public ResponseEntity<Deck> updateDeck(@PathVariable("id") long id,
                                              @PathVariable("deck_id") long deck_id,
                                              @RequestBody Deck updateDeck) {
        return userRepository.findDeck(id, deck_id)
                .map(_deck -> {
                    _deck.setTitle(updateDeck.getTitle());
                    return new ResponseEntity<>(deckRepository.save(_deck), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/users/{id}/decks/{deck_id}")
    public ResponseEntity<HttpStatus> deleteDeck(@PathVariable("id") long id,
                                                    @PathVariable("deck_id") long deck_id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User user = userData.get();
            user.deleteDeck(deck_id);
            try {
                deckRepository.deleteById(deck_id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/{id}/decks/{deck_id}/cards")
    public ResponseEntity<List<Card>> getAllCards(@PathVariable("id") long id,
                                                  @PathVariable("deck_id") long deck_id,
                                                  @RequestParam(required = false) String keyword,
                                                  String question, String answer) {
        try {
            List<Card> cards = new ArrayList<>();
            if (keyword != null) {
                cards.addAll(userRepository.findCardByQuestionAndAnswer(id, deck_id, keyword));
            } else if (question != null) {
                cards.addAll(userRepository.findCardByQuestion(id, deck_id, question));
            } else if (answer != null){
                cards.addAll(userRepository.findCardByAnswer(id, deck_id, answer));
            } else {
                cards.addAll(userRepository.findAllCards(id, deck_id));
            }
            if (cards.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(cards, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users/{id}/decks/{deck_id}/cards")
    public ResponseEntity<Card> createCard(@PathVariable("id") long id,
                                           @PathVariable("deck_id") long deck_id,
                                           @RequestBody Card newCard) {
        Optional<Deck> deckData = userRepository.findDeck(id, deck_id);
        if (deckData.isPresent()) {
            Deck _deck = deckData.get();
            _deck.addCard(newCard);
            try {
                Card card = cardRepository.save(newCard);
                return new ResponseEntity<>(card, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/{id}/decks/{deck_id}/cards/{card_id}")
    public ResponseEntity<Card> getCard(@PathVariable("id") long id,
                                        @PathVariable("deck_id") long deck_id,
                                        @PathVariable("card_id") long card_id) {
        Optional<Card> cardData = userRepository.findCard(id, deck_id, card_id);
        return cardData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/users/{id}/decks/{deck_id}/cards/{card_id}")
    public ResponseEntity<Card> updateCard(@PathVariable("id") long id,
                                           @PathVariable("deck_id") long deck_id,
                                           @PathVariable("card_id") long card_id,
                                           @RequestBody Card updateCard) {
        Optional<Card> cardData = userRepository.findCard(id, deck_id, card_id);
        return userRepository.findCard(id, deck_id, card_id)
                .map(card -> {
                    card.setQuestion(updateCard.getQuestion());
                    card.setAnswer(updateCard.getAnswer());
                    return new ResponseEntity<>(cardRepository.save(card), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/users/{id}/decks/{deck_id}/cards/{card_id}")
    public ResponseEntity<HttpStatus> deleteCard(@PathVariable("id") long id,
                                                 @PathVariable("deck_id") long deck_id,
                                                 @PathVariable("card_id") long card_id) {
        Optional<Deck> deckData = userRepository.findDeck(id, deck_id);
        if (deckData.isPresent()) {
            Deck _deck = deckData.get();
            _deck.deleteCard(card_id);
            try {
                cardRepository.deleteById(card_id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

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
