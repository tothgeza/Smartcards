package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.PublicDeckDTO;
import com.codecool.smartcards.models.PublicDeck;
import com.codecool.smartcards.repository.PublicDeckRepository;
import com.codecool.smartcards.service.PublicDeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PublicDeckServiceImpl implements PublicDeckService {

    PublicDeckRepository publicDeckRepository;

    @Autowired
    public PublicDeckServiceImpl(PublicDeckRepository publicDeckRepository) {
        this.publicDeckRepository = publicDeckRepository;
    }

    @Override
    public ResponseEntity<List<PublicDeckDTO>> getAllDecks() {
        try {
            List<PublicDeckDTO> decks = new ArrayList<>(publicDeckRepository.findAllPublicDeck());
            if (decks.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(decks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<PublicDeckDTO> addDeck(PublicDeck newDeck) {
        try {
            PublicDeck _deck = publicDeckRepository.save(newDeck);
            return new ResponseEntity<>(
                    new PublicDeckDTO(_deck.getId(),
                            _deck.getTitle(),
                            _deck.isPublic()), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<PublicDeckDTO> getPublicDeckById(long deckID) {
        try {
            Optional<PublicDeckDTO> deck = publicDeckRepository.findPublicDeckByIdDTO(deckID);
            return deck.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<PublicDeckDTO> updateDeck(long deckID, PublicDeck updateDeck) {
        return publicDeckRepository.findPublicDeckById(deckID)
                .map(deck -> {
                    deck.setTitle(updateDeck.getTitle());
                    deck.setPublic(updateDeck.isPublic());
                    PublicDeck uDeck = publicDeckRepository.save(deck);
                    return new ResponseEntity<>(new PublicDeckDTO(
                            uDeck.getId(),
                            uDeck.getTitle(),
                            uDeck.isPublic()), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteDeck(long deckID) {
        try {
            publicDeckRepository.deleteById(deckID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

