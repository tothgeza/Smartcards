package com.codecool.smartcards.service;

import com.codecool.smartcards.models.*;
import com.codecool.smartcards.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    UserRepository userRepository;
    MyClassRepository myClassRepository;
    DeckRepository deckRepository;
    CardRepository cardRepository;
    PublicDeckRepository publicDeckRepository;

    public UserServiceImpl(UserRepository userRepository, MyClassRepository myClassRepository,
                           DeckRepository deckRepository, CardRepository cardRepository,
                           PublicDeckRepository publicDeckRepository) {
        this.userRepository = userRepository;
        this.myClassRepository = myClassRepository;
        this.deckRepository = deckRepository;
        this.cardRepository = cardRepository;
        this.publicDeckRepository = publicDeckRepository;
    }

    @Override
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

    @Override
    public ResponseEntity<User> createUser(User newUser) {
        try {
            User user = userRepository.save(newUser);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<User> getUserById(long id) {
        Optional<User> userData = userRepository.findById(id);
        return userData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<User> updateUser(long id, User updateUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updateUser.getUsername());
                    user.setEmail(updateUser.getEmail());
                    return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteUser(long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<MyClass>> getAllClasses(long id) {
        try {
            List<MyClass> classes = new ArrayList<>(userRepository.findAllMyClasses(id));
            if (classes.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(classes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<MyClass> createMyClass(long id, MyClass newMyClass) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User user = userData.get();
            user.addMyClass(newMyClass);
            try {
                MyClass _myClass = myClassRepository.save(newMyClass);
                return new ResponseEntity<>(_myClass, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<MyClass> getMyClassById(long myClass_id, long id) {
        Optional<MyClass> myClassData = userRepository.findMyClass(id, myClass_id);
        return myClassData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<MyClass> updateMyClass(long id, long myClass_id, MyClass updateMyClass) {
        return userRepository.findMyClass(id, myClass_id)
                .map(_myClass -> {
                    _myClass.setTitle(updateMyClass.getTitle());
                    return new ResponseEntity<>(myClassRepository.save(_myClass), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteMyClass(long id, long myClass_id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User user = userData.get();
            user.deleteMyClass(myClass_id);
            try {
                myClassRepository.deleteById(myClass_id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<List<Deck>> getAllDecks(long id, long myClass_id) {
        try {
            List<Deck> decks = new ArrayList<>(userRepository.findAllDecks(id, myClass_id));
            if (decks.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(decks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Deck> createDeck(long id, long myClass_id, Deck newDeck) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User user = userData.get();
            MyClass myClass = user.getMyClassById(myClass_id);
            myClass.addDeck(newDeck);
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

    @Override
    public ResponseEntity<Deck> getDeckById(long deck_id, long myClass_id, long id) {
        Optional<Deck> deckData = userRepository.findDeck(id, myClass_id, deck_id);
        return deckData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<Deck> updateDeck(long id, long myClass_id, long deck_id, Deck updateDeck) {
        return userRepository.findDeck(id, myClass_id, deck_id)
                .map(_deck -> {
                    _deck.setTitle(updateDeck.getTitle());
                    return new ResponseEntity<>(deckRepository.save(_deck), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteDeck(long id, long myClass_id, long deck_id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User user = userData.get();
            MyClass myClass = user.getMyClassById(myClass_id);
            myClass.deleteDeck(deck_id);
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

    @Override
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

    @Override
    public ResponseEntity<Card> createCard(long id, long myClass_id, long deck_id, Card newCard) {
        Optional<Deck> deckData = userRepository.findDeck(id, myClass_id, deck_id);
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

    @Override
    public ResponseEntity<Card> getCard(long id, long myClass_id, long deck_id, long card_id) {
        Optional<Card> cardData = userRepository.findCard(id, myClass_id, deck_id, card_id);
        return cardData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<Card> updateCard(long id, long myClass_id, long deck_id, long card_id, Card updateCard) {
//        Optional<Card> cardData = userRepository.findCard(id, myClass_id, deck_id, card_id);
        return userRepository.findCard(id, myClass_id, deck_id, card_id)
                .map(card -> {
                    card.setQuestion(updateCard.getQuestion());
                    card.setAnswer(updateCard.getAnswer());
                    return new ResponseEntity<>(cardRepository.save(card), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteCard(long id, long myClass_id, long deck_id, long card_id) {
        Optional<Deck> deckData = userRepository.findDeck(id, myClass_id, deck_id);
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

    @Override
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
