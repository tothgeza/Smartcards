package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.UserDTO;
import com.codecool.smartcards.models.*;
import com.codecool.smartcards.repository.*;
import com.codecool.smartcards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<UserDTO> users = new ArrayList<>(userRepository.findAllUser());
            if (users.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<UserDTO> createUser(User newUser) {
        try {
            User user = userRepository.save(newUser);
            return new ResponseEntity<>(new UserDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail()), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<UserDTO> getUserById(long userID) {
        try {
            Optional<UserDTO> userData = userRepository.findUserByIdDTO(userID);
            return userData.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<UserDTO> updateUser(long userID, User updateUser) {
        try {
            return userRepository.findById(userID)
                    .map(user -> {
                        user.setUsername(updateUser.getUsername());
                        user.setEmail(updateUser.getEmail());
                        User uUser = userRepository.save(user);
                        return new ResponseEntity<>(new UserDTO(
                                uUser.getId(),
                                uUser.getUsername(),
                                uUser.getEmail()), HttpStatus.OK);
                    })
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<HttpStatus> deleteUser(long userID) {
        try {
            userRepository.deleteById(userID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @Override
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
