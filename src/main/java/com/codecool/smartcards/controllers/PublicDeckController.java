package com.codecool.smartcards.controllers;

import com.codecool.smartcards.dto.PublicDeckDTO;
import com.codecool.smartcards.models.PublicDeck;
import com.codecool.smartcards.service.PublicDeckService;
import com.codecool.smartcards.service.impl.PublicDeckServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public/deck")
public class PublicDeckController {

    private final PublicDeckService publicDeckService;

    @Autowired
    public PublicDeckController(PublicDeckServiceImpl publicDeckServiceImpl) {
        this.publicDeckService = publicDeckServiceImpl;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/all")
    public ResponseEntity<List<PublicDeckDTO>> getAllDecks() {
        return publicDeckService.getAllDecks();
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add")
    public ResponseEntity<PublicDeckDTO> createDeck(@RequestBody PublicDeck newDeck) {
        return publicDeckService.addDeck(newDeck);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{deckID}")
    public ResponseEntity<PublicDeckDTO> getPublicDeckById(@PathVariable("deckID") long deckID) {
        return publicDeckService.getPublicDeckById(deckID);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{deckID}")
    public ResponseEntity<PublicDeckDTO> updateDeck(@PathVariable("deckID") long deckID,
                                              @RequestBody PublicDeck updateDeck) {
        return publicDeckService.updateDeck(deckID, updateDeck);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{deckID}")
    public ResponseEntity<HttpStatus> deleteDeck(@PathVariable("deckID") long deckID) {
        return publicDeckService.deleteDeck(deckID);
    }
}
