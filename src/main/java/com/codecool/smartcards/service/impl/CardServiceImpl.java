package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.CardDTO;
import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.repository.CardRepository;
import com.codecool.smartcards.repository.DeckRepository;
import com.codecool.smartcards.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CardServiceImpl implements CardService {

    CardRepository cardRepository;
    DeckRepository deckRepository;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, DeckRepository deckRepository) {
        this.cardRepository = cardRepository;
        this.deckRepository = deckRepository;
    }

    @Override
    public ResponseEntity<List<CardDTO>> getAllCardsByDeck(long deckID) {
//                                                     @RequestParam(required = false) String keyword,
//                                                     String question, String answer) {
//        try {
//            List<CardDTO> cards = new ArrayList<>();
//            if (keyword != null) {
//                cards.addAll(userRepository.findCardByQuestionAndAnswer(userID, myClassID, deckID, keyword));
//            } else if (question != null) {
//                cards.addAll(userRepository.findCardByQuestion(userID, myClassID, deckID, question));
//            } else if (answer != null) {
//                cards.addAll(userRepository.findCardByAnswer(userID, myClassID, deckID, answer));
//            } else {
//                cards.addAll(userRepository.findAllCards(userID, myClassID, deckID));
//            }
//            if (cards.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(cards, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
        try {
            List<CardDTO> cards =
                    new ArrayList<>(cardRepository.findCardByDeckIdDTO(deckID));
            if (cards.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(cards, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<CardDTO> createCard(long deckID, Card newCard) {
        Optional<Deck> deckData = deckRepository.findDeckById(deckID);
        if (deckData.isPresent()) {
            Deck deck = deckData.get();
            newCard.setDeck(deck);
            try {
                Card _card = cardRepository.save(newCard);
                return new ResponseEntity<>(
                        new CardDTO(_card.getId(),
                                _card.getQuestion(),
                                _card.getAnswer(),
                                _card.getDeck().getId(),
                                _card.getDeck().getMyClass().getId(),
                                _card.getDeck().getMyClass().getUser().getId()), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<CardDTO> getCard(long cardID) {
        Optional<CardDTO> cardData = cardRepository.findCardByIdDTO(cardID);
        return cardData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<CardDTO> updateCard(long cardID, Card updateCard) {
        return cardRepository.findCardById(cardID)
                .map(card -> {
                    card.setQuestion(updateCard.getQuestion());
                    card.setAnswer(updateCard.getAnswer());
                    Card _card = cardRepository.save(card);
                    return new ResponseEntity<>(
                            new CardDTO(_card.getId(),
                                    _card.getQuestion(),
                                    _card.getAnswer(),
                                    _card.getDeck().getId(),
                                    _card.getDeck().getMyClass().getId(),
                                    _card.getDeck().getMyClass().getUser().getId()
                            ), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteCard(long cardID) {
        try {
            cardRepository.deleteById(cardID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
