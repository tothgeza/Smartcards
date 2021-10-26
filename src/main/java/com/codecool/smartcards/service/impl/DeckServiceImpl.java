package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.DeckDTO;
import com.codecool.smartcards.dto.PublicDeckDTO;
import com.codecool.smartcards.models.*;
import com.codecool.smartcards.repository.*;
import com.codecool.smartcards.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DeckServiceImpl implements DeckService {

    CardRepository cardRepository;
    PublicCardRepository publicCardRepository;
    DeckRepository deckRepository;
    PublicDeckRepository publicDeckRepository;
    MyClassRepository myClassRepository;

    @Autowired
    public DeckServiceImpl(DeckRepository deckRepository, MyClassRepository myClassRepository,
                           CardRepository cardRepository, PublicCardRepository publicCardRepository,
                           PublicDeckRepository publicDeckRepository) {
        this.cardRepository = cardRepository;
        this.publicCardRepository = publicCardRepository;
        this.deckRepository = deckRepository;
        this.publicDeckRepository = publicDeckRepository;
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
    public ResponseEntity<DeckDTO> getDeckDTOById(long deckID) {
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
