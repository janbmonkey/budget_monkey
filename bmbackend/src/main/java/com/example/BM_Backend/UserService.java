package com.example.BM_Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    UserService(){}

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

    @Transactional
    public Map<String, Boolean> deleteUser(long id){
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(()-> new ResourceAccessException("User not found "+ id));
        userRepository.delete(userEntity);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
