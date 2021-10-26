package com.codecool.smartcards.service;

import com.codecool.smartcards.dto.PublicCardDTO;
import com.codecool.smartcards.models.PublicCard;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PublicCardService {

    ResponseEntity<List<PublicCardDTO>> getAllPublicCardsByDeck(long deckID);

    ResponseEntity<PublicCardDTO> addCard(long deckID, PublicCard newCard);

    ResponseEntity<PublicCardDTO> getCard(long cardID);

    ResponseEntity<HttpStatus> deletePublicCard(long cardID);
}
