package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.PublicDeckDTO;
import com.codecool.smartcards.models.*;
import com.codecool.smartcards.repository.*;
import com.codecool.smartcards.service.PublicDeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PublicDeckServiceImpl implements PublicDeckService {

    CardRepository cardRepository;
    PublicCardRepository publicCardRepository;
    DeckRepository deckRepository;
    PublicDeckRepository publicDeckRepository;
    MyClassRepository myClassRepository;

    @Autowired
    public PublicDeckServiceImpl(CardRepository cardRepository, PublicCardRepository publicCardRepository,
                                 DeckRepository deckRepository, PublicDeckRepository publicDeckRepository,
                                 MyClassRepository myClassRepository) {
        this.cardRepository = cardRepository;
        this.publicCardRepository = publicCardRepository;
        this.deckRepository = deckRepository;
        this.publicDeckRepository = publicDeckRepository;
        this.myClassRepository = myClassRepository;
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

    @Override
    public ResponseEntity<HttpStatus> shareDeckById(long deckID) {
        Optional<Deck> _deck = deckRepository.findDeckById(deckID);
        if (_deck.isPresent()) {
            PublicDeck _pDeck = new PublicDeck(_deck.get().getTitle(), _deck.get().isPublic());
            publicDeckRepository.save(_pDeck);
            List<Card> _cards = cardRepository.findCardByDeckId(deckID);
            for (Card card : _cards) {
                PublicCard _pCard = new PublicCard(card.getAnswer(), card.getQuestion(), _pDeck);
                publicCardRepository.save(_pCard);
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<HttpStatus> downloadDeckById(@PathVariable("myClassID") long myClassID,
                                                       @PathVariable("deckID") long deckID) {
        Optional<PublicDeck> _pDeck = publicDeckRepository.findPublicDeckById(deckID);
        Optional<MyClass> _myClass = myClassRepository.findMyClassById(myClassID);
        if (_pDeck.isPresent() && _myClass.isPresent()) {
            Deck _deck = new Deck(_pDeck.get().getTitle(), _pDeck.get().isPublic(), _myClass.get());
            deckRepository.save(_deck);
            List<PublicCard> _pCards = publicCardRepository.findPublicCardByDeckId(deckID);
            for (PublicCard publicCard : _pCards) {
                Card _card = new Card(publicCard.getAnswer(), publicCard.getQuestion(), _deck);
                cardRepository.save(_card);
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

