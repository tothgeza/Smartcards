package com.codecool.smartcards.controllers;

import com.codecool.smartcards.dto.PublicCardDTO;
import com.codecool.smartcards.models.PublicCard;
import com.codecool.smartcards.service.PublicCardService;
import com.codecool.smartcards.service.impl.PublicCardServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public/card")
public class PublicCardController {

    private final PublicCardService publicCardService;

    @Autowired
    public PublicCardController(PublicCardServiceImpl publicCardServiceImpl) {
        this.publicCardService = publicCardServiceImpl;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/deck/{deckID}")
    public ResponseEntity<List<PublicCardDTO>> getAllCardsByDeck(@PathVariable("deckID") long deckID) {
        return publicCardService.getAllPublicCardsByDeck(deckID);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/deck/{deckID}")
    public ResponseEntity<PublicCardDTO> addCard(@PathVariable("deckID") long deckID,
                                              @RequestBody PublicCard newCard) {
        return publicCardService.addCard(deckID, newCard);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{cardID}")
    public ResponseEntity<PublicCardDTO> getCard(@PathVariable("cardID") long cardID) {
        return publicCardService.getCard(cardID);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{cardID}")
    public ResponseEntity<HttpStatus> deleteCard(@PathVariable("cardID") long cardID) {
        return publicCardService.deletePublicCard(cardID);
    }
}
