package com.codecool.smartcards.controllers;

import com.codecool.smartcards.dto.CardDTO;
import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.service.CardService;
import com.codecool.smartcards.service.impl.CardServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/card")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardServiceImpl cardServiceImpl) {
        this.cardService = cardServiceImpl;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/deck/{deckID}")
    public ResponseEntity<List<CardDTO>> getAllCardsByDeck(@PathVariable("deckID") long deckID) {
        return cardService.getAllCardsByDeck(deckID);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/deck/{deckID}")
    public ResponseEntity<CardDTO> createCard(@PathVariable("deckID") long deckID,
                                           @RequestBody Card newCard) {
        return cardService.createCard(deckID, newCard);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{cardID}")
    public ResponseEntity<CardDTO> getCard(@PathVariable("cardID") long cardID) {
        return cardService.getCard(cardID);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{cardID}")
    public ResponseEntity<CardDTO> updateCard(@PathVariable("cardID") long cardID,
                                              @RequestBody Card updateCard) {
        return cardService.updateCard(cardID, updateCard);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{cardID}")
    public ResponseEntity<HttpStatus> deleteCard(@PathVariable("cardID") long cardID) {
        return cardService.deleteCard(cardID);
    }
}
