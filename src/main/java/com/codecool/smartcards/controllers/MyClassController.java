package com.codecool.smartcards.controllers;

import com.codecool.smartcards.dto.MyClassDTO;
import com.codecool.smartcards.models.MyClass;
import com.codecool.smartcards.service.MyClassService;
import com.codecool.smartcards.service.impl.MyClassServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/myclass")
public class MyClassController {

    private final MyClassService myClassService;

    @Autowired
    public MyClassController(MyClassServiceImpl myClassServiceImpl) {
        this.myClassService = myClassServiceImpl;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<MyClassDTO>> getAllMyClassByUser(@PathVariable("userID") long userID) {
        return myClassService.getAllMyClassByUser(userID);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/user/{userID}")
    public ResponseEntity<MyClassDTO> createMyClass(@PathVariable("userID") long userID,
                                                    @RequestBody MyClass newMyClass) {
        return myClassService.createMyClass(userID, newMyClass);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{myClassID}")
    public ResponseEntity<MyClassDTO> getMyClassById(@PathVariable("myClassID") long myClassID) {
        return myClassService.getMyClassById(myClassID);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{myClassID}")
    public ResponseEntity<MyClassDTO> updateMyClass(@PathVariable("myClassID") long myClassID,
                                                    @RequestBody MyClass updateMyClass) {
        return myClassService.updateMyClass(myClassID, updateMyClass);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{myClassID}")
    public ResponseEntity<HttpStatus> deleteMyClass(@PathVariable("myClassID") long myClassID) {
        return myClassService.deleteMyClass(myClassID);
    }
}
