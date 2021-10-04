package com.codecool.smartcards.service;

import com.codecool.smartcards.dto.CardDTO;
import com.codecool.smartcards.models.Card;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CardService {

    ResponseEntity<List<CardDTO>> getAllCardsByDeck(long deckID);

    ResponseEntity<CardDTO> createCard(long deckID, Card newCard);

    ResponseEntity<CardDTO> getCard(long cardID);

    ResponseEntity<CardDTO> updateCard(long cardID, Card updateCard);

    ResponseEntity<HttpStatus> deleteCard(long cardID);
}
