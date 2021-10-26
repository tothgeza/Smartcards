package com.codecool.smartcards.service;

import com.codecool.smartcards.dto.PublicDeckDTO;
import com.codecool.smartcards.models.PublicDeck;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PublicDeckService {

    ResponseEntity<List<PublicDeckDTO>> getAllDecks();

    ResponseEntity<PublicDeckDTO> addDeck(PublicDeck newDeck);

    ResponseEntity<PublicDeckDTO> getPublicDeckById(long deckID);

    ResponseEntity<PublicDeckDTO> updateDeck(long deckID, PublicDeck updateDeck);

    ResponseEntity<HttpStatus> deleteDeck(long deckID);
}
