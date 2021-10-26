package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.PublicCardDTO;
import com.codecool.smartcards.models.PublicCard;
import com.codecool.smartcards.models.PublicDeck;
import com.codecool.smartcards.repository.PublicCardRepository;
import com.codecool.smartcards.repository.PublicDeckRepository;
import com.codecool.smartcards.service.PublicCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PublicCardServiceImpl implements PublicCardService {

    PublicCardRepository publicCardRepository;
    PublicDeckRepository publicDeckRepository;

    @Autowired
    public PublicCardServiceImpl(PublicCardRepository publicCardRepository, PublicDeckRepository publicDeckRepository) {
        this.publicCardRepository = publicCardRepository;
        this.publicDeckRepository = publicDeckRepository;
    }

    @Override
    public ResponseEntity<List<PublicCardDTO>> getAllPublicCardsByDeck(long deckID) {
        try {
            List<PublicCardDTO> cards =
                    new ArrayList<>(publicCardRepository.findPublicCardByDeckIdDTO(deckID));
            if (cards.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(cards, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<PublicCardDTO> addCard(long deckID, PublicCard newCard) {
        Optional<PublicDeck> deckData = publicDeckRepository.findPublicDeckById(deckID);
        if (deckData.isPresent()) {
            PublicDeck deck = deckData.get();
            newCard.setPublicDeck(deck);
            try {
                PublicCard _card = publicCardRepository.save(newCard);
                return new ResponseEntity<>(
                        new PublicCardDTO(_card.getId(),
                                _card.getQuestion(),
                                _card.getAnswer(),
                                _card.getPublicDeck().getId()), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<PublicCardDTO> getCard(long cardID) {
        Optional<PublicCardDTO> cardData = publicCardRepository.findPublicCardByIdDTO(cardID);
        return cardData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deletePublicCard(long cardID) {
        try {
            publicCardRepository.deleteById(cardID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
