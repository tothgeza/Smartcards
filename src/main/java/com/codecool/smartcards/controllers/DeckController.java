package com.codecool.smartcards.controllers;

import com.codecool.smartcards.dto.DeckDTO;
import com.codecool.smartcards.models.Deck;
import com.codecool.smartcards.service.DeckService;
import com.codecool.smartcards.service.impl.DeckServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/deck")
public class DeckController {

    private final DeckService deckService;

    @Autowired
    public DeckController(DeckServiceImpl deckServiceImpl) {
        this.deckService = deckServiceImpl;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/myClass/{myClassID}")
    public ResponseEntity<List<DeckDTO>> getAllDecks(@PathVariable("myClassID") long myClassID) {
        return deckService.getAllDecksByMyClass(myClassID);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/myClass/{myClassID}")
    public ResponseEntity<DeckDTO> createDeck(@PathVariable("myClassID") long myClassID,
                                              @RequestBody Deck newDeck) {
        return deckService.createDeck(myClassID, newDeck);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{deckID}")
    public ResponseEntity<DeckDTO> getDeckById(@PathVariable("deckID") long deckID) {
        return deckService.getDeckById(deckID);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{deckID}")
    public ResponseEntity<DeckDTO> updateDeck(@PathVariable("deckID") long deckID,
                                              @RequestBody Deck updateDeck) {
        return deckService.updateDeck(deckID, updateDeck);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{deckID}")
    public ResponseEntity<HttpStatus> deleteDeck(@PathVariable("deckID") long deckID) {
        return deckService.deleteDeck(deckID);
    }
}
