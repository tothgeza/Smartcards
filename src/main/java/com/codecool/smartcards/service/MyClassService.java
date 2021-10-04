package com.codecool.smartcards.service;

import com.codecool.smartcards.dto.MyClassDTO;
import com.codecool.smartcards.models.MyClass;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MyClassService {

    ResponseEntity<List<MyClassDTO>> getAllMyClassByUser(long userID);

    ResponseEntity<MyClassDTO> createMyClass(long userID, MyClass newMyClass);

    ResponseEntity<MyClassDTO> getMyClassById(long myClass_id);

    ResponseEntity<MyClassDTO> updateMyClass(long myClassID, MyClass updateMyClass);

    ResponseEntity<HttpStatus> deleteMyClass(long myClassID);
}
