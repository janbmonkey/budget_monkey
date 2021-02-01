package com.example.BM_Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    UserService(){
        System.out.println("Ctor UserService");
    }

    @Transactional
    public Optional<UserEntity> getUser(long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public long setUser(UserEntity userEntity){
        userRepository.save(userEntity);
        return userEntity.getId();
    }
}
