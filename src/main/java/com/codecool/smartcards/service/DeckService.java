package com.codecool.smartcards.service;

import com.codecool.smartcards.dto.DeckDTO;
import com.codecool.smartcards.models.Deck;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DeckService {

    ResponseEntity<List<DeckDTO>> getAllDecksByMyClass(long myClassID);

    ResponseEntity<DeckDTO> createDeck(long myClassID, Deck newDeck);

    ResponseEntity<DeckDTO> getDeckById(long deckID);

    ResponseEntity<DeckDTO> updateDeck(long deckID, Deck updateDeck);

    ResponseEntity<HttpStatus> deleteDeck( long deckID);
}
