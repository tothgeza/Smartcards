package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.DeckDTO;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.models.MyClass;
import com.codecool.smartcards.repository.DeckRepository;
import com.codecool.smartcards.repository.MyClassRepository;
import com.codecool.smartcards.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DeckServiceImpl implements DeckService {

    DeckRepository deckRepository;
    MyClassRepository myClassRepository;

    @Autowired
    public DeckServiceImpl(DeckRepository deckRepository, MyClassRepository myClassRepository) {
        this.deckRepository = deckRepository;
        this.myClassRepository = myClassRepository;
    }

    @Override
    public ResponseEntity<List<DeckDTO>> getAllDecksByMyClass(long myClassID) {
        try {
            List<DeckDTO> decks = new ArrayList<>(deckRepository.findDeckByMyClassIdDTO(myClassID));
            if (decks.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(decks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<DeckDTO> createDeck(long myClassID, Deck newDeck) {
        Optional<MyClass> myClassData = myClassRepository.findMyClassById(myClassID);
        if (myClassData.isPresent()) {
            MyClass myClass = myClassData.get();
            newDeck.setMyClass(myClass);
            try {
                Deck _deck = deckRepository.save(newDeck);
                return new ResponseEntity<>(
                        new DeckDTO(_deck.getId(),
                                _deck.getTitle(),
                                _deck.isPublic(),
                                _deck.getMyClass().getId(),
                                _deck.getMyClass().getUser().getId()), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<DeckDTO> getDeckById(long deckID) {
        try {
            Optional<DeckDTO> deck = deckRepository.findDeckByIdDTO(deckID);
            return deck.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<DeckDTO> updateDeck(long deckID, Deck updateDeck) {
        return deckRepository.findDeckById(deckID)
                .map(deck -> {
                    deck.setTitle(updateDeck.getTitle());
                    deck.setPublic(updateDeck.isPublic());
                    Deck uDeck = deckRepository.save(deck);
                    return new ResponseEntity<>(new DeckDTO(
                            uDeck.getId(),
                            uDeck.getTitle(),
                            uDeck.isPublic(),
                            uDeck.getMyClass().getId(),
                            uDeck.getMyClass().getUser().getId()), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteDeck(long deckID) {
        try {
            deckRepository.deleteById(deckID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
