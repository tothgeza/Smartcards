package com.codecool.smartcards.service;

import com.codecool.smartcards.models.User;
import com.codecool.smartcards.repository.UserRepository;

import java.util.List;

//@Service
public class  UserService {
    UserRepository userRepository;

//    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllMembers() {
        return userRepository.findAll();
    }

    public void addMember(User user) {
        userRepository.save(user);
    }

    public User getMemberById(long id) {
        return userRepository.getById(id);
    }
}
