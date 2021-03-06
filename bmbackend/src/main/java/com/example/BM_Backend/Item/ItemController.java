package com.example.BM_Backend.Item;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ItemController {

    @Autowired
    ItemService itemService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/item/{id}")
    @ResponseBody
    ItemDto getItem(@PathVariable("id") long id) {
        Optional<ItemEntity> itemEntityOptional = itemService.getItem(id);
        ItemDto itemDto = itemEntityOptional.map(itemEntity -> this.convertToDto(itemEntity)).orElse(new ItemDto());
        return itemDto;
    }

    @GetMapping(value = "/item")
    @ResponseBody
    List<ItemDto> getAllItems() {
        List<ItemEntity> itemEntities = itemService.getAllItems();
        List<ItemDto> itemDtos = itemEntities.stream().map((item) -> this.convertToDto(item)).collect(Collectors.toList());
        return itemDtos;
    }

    @PostMapping(value = "/item")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    long postItem(@RequestBody ItemDto itemDto){
        System.out.println(itemDto);
        ItemEntity itemEntity = this.convertToEntity(itemDto);
        System.out.println(itemEntity);
        return itemService.setItem(itemEntity);
    }

    @DeleteMapping(value ="/item/{id}")
    @ResponseBody
    public Map<String, Boolean> deleteItem(@PathVariable(value = "id") long itemId)
            throws ResourceAccessException {
        return itemService.deleteItem(itemId);
    }


    private ItemDto convertToDto(ItemEntity itemEntity){
        ItemDto itemDto = modelMapper.map(itemEntity, ItemDto.class);
        return itemDto;
    }

    private ItemEntity convertToEntity(ItemDto itemDto){
        ItemEntity itemEntity = modelMapper.map(itemDto, ItemEntity.class);
        return itemEntity;
    }
}
