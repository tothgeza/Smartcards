package com.codecool.smartcards.controllers;

import com.codecool.smartcards.dto.UserDTO;
import com.codecool.smartcards.models.Card;
import com.codecool.smartcards.models.PublicDeck;
import com.codecool.smartcards.models.User;
import com.codecool.smartcards.repository.*;
import com.codecool.smartcards.service.UserService;
import com.codecool.smartcards.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserServiceImpl userServiceImpl) {
        this.userService = userServiceImpl;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("")
    public ResponseEntity<UserDTO> createUser(@RequestBody User newUser) {
        return userService.createUser(newUser);
    }

    @GetMapping("{useID}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("useID") long useID) {
        return userService.getUserById(useID);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{useID}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("useID") long useID, @RequestBody User updateUser) {
        return userService.updateUser(useID, updateUser);
    }

    @DeleteMapping("/{useID}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("useID") long useID) {
        return userService.deleteUser(useID);
    }

//    @PreAuthorize("hasRole('USER')")
//    @GetMapping("/published")
//    public ResponseEntity<List<PublicDeck>> getAllDecks(@RequestParam(required = false) String title) {
//        try {
//            List<PublicDeck> decks = new ArrayList<>();
//            if (title == null)
//                decks.addAll(publicDeckRepository.findAll());
//            else
//                decks.addAll(publicDeckRepository.findByTitleContainingIgnoreCase(title));
//            if (decks.isEmpty())
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            return new ResponseEntity<>(decks, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}
