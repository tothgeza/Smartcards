package com.codecool.smartcards.service.impl;

import com.codecool.smartcards.dto.MyClassDTO;
import com.codecool.smartcards.models.MyClass;
import com.codecool.smartcards.models.User;
import com.codecool.smartcards.repository.MyClassRepository;
import com.codecool.smartcards.repository.UserRepository;
import com.codecool.smartcards.service.MyClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MyClassServiceImpl implements MyClassService {

    UserRepository userRepository;
    MyClassRepository myClassRepository;

    @Autowired
    public MyClassServiceImpl(MyClassRepository myClassRepository, UserRepository userRepository) {
        this.myClassRepository = myClassRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<List<MyClassDTO>> getAllMyClassByUser(long userID) {
        try {
            List<MyClassDTO> classes = new ArrayList<>(myClassRepository.findMyClassByUserIdDTO(userID));
            if (classes.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(classes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<MyClassDTO> createMyClass(long userID, MyClass newMyClass) {
        Optional<User> userData = userRepository.findUserById(userID);
        if (userData.isPresent()) {
            User user = userData.get();
            newMyClass.setUser(user);
            try {
                MyClass _myClass = myClassRepository.save(newMyClass);
                return new ResponseEntity<>(
                        new MyClassDTO(_myClass.getId(), _myClass.getTitle(), _myClass.getUser().getId()),
                        HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<MyClassDTO> getMyClassById(long myClassID) {
        try {
            Optional<MyClassDTO> myClass = myClassRepository.findMyClassByIdDTO(myClassID);
            return myClass.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<MyClassDTO> updateMyClass(long myClassID, MyClass updateMyClass) {

        return myClassRepository.findMyClassById(myClassID)
                .map(myClass -> {
                    myClass.setTitle(updateMyClass.getTitle());
                    MyClass uMyClass = myClassRepository.save(myClass);
                    return new ResponseEntity<>(new MyClassDTO(uMyClass.getId(),
                            uMyClass.getTitle(), uMyClass.getUser().getId()), HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteMyClass(long myClassID) {
        Optional<MyClass> myClassData = myClassRepository.findById(myClassID);
        if (myClassData.isPresent()){
            MyClass myClass = myClassData.get();
            try {
                myClassRepository.delete(myClass);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
