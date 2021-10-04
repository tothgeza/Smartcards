package com.codecool.smartcards.repository;

import com.codecool.smartcards.dto.MyClassDTO;
import com.codecool.smartcards.models.MyClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MyClassRepository extends JpaRepository<MyClass, Long> {

    @Query("select new com.codecool.smartcards.dto.MyClassDTO(m.id, m.title, m.user.id)" +
            " from MyClass m where m.user.id = :userID order by m.id asc")
    List<MyClassDTO> findMyClassByUserIdDTO(@Param("userID") long userID);

    @Query("select m from MyClass m where m.id = :myClassID")
    Optional<MyClass> findMyClassById(@Param("myClassID") long myClassID);

    @Query("select new com.codecool.smartcards.dto.MyClassDTO(m.id, m.title, m.user.id)" +
            " from MyClass m where m.id = :myClassID")
    Optional<MyClassDTO> findMyClassByIdDTO(@Param("myClassID") long myClassID);


}
