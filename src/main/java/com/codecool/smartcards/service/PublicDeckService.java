package com.codecool.smartcards.service;

import com.codecool.smartcards.dto.PublicDeckDTO;
import com.codecool.smartcards.models.PublicDeck;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface PublicDeckService {

    ResponseEntity<List<PublicDeckDTO>> getAllDecks();

    ResponseEntity<PublicDeckDTO> addDeck(PublicDeck newDeck);

    ResponseEntity<PublicDeckDTO> getPublicDeckById(long deckID);

    ResponseEntity<PublicDeckDTO> updateDeck(long deckID, PublicDeck updateDeck);

    ResponseEntity<HttpStatus> deleteDeck(long deckID);

    ResponseEntity<HttpStatus> shareDeckById(@PathVariable("deckID") long deckID);

    ResponseEntity<HttpStatus> downloadDeckById(@PathVariable("deckID") long deckID,
                                                @PathVariable("myClassID") long myClassID);
}
