package com.example.BM_Backend;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Map;
import java.util.MissingResourceException;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/user/{id}")
    @ResponseBody
    public UserDto getUser(@PathVariable("id") long id) {
        Optional<UserEntity> userEntityOptional = userService.getUser(id);
        UserDto userDto = userEntityOptional.map(userEntity -> this.convertToDto(userEntity)).orElse(new UserDto());
        return userDto;
    }

    @GetMapping(value = "/user")
    @ResponseBody
    public List<UserDto> getAllUsers() {
        List<UserEntity> userEntities = userService.getAllUsers();
        List<UserDto> userDtos = userEntities.stream().map((user) -> this.convertToDto(user)).collect(Collectors.toList());
        return userDtos;
    }

    @PostMapping(value = "/user")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public long postUser(@RequestBody UserDto userDto){
        UserEntity userEntity = this.convertToEntity(userDto);
        System.out.println(userEntity);
        return userService.setUser(userEntity);
    }

    @DeleteMapping(value ="/user/{id}")
    @ResponseBody
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long userId)
    throws ResourceAccessException {
        return userService.deleteUser(userId);
    }

    private UserDto convertToDto(UserEntity userEntity){
        UserDto userDto = modelMapper.map(userEntity, UserDto.class);
        return userDto;
    }

    private UserEntity convertToEntity(UserDto userDto){
        UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
        return userEntity;
    }
}
