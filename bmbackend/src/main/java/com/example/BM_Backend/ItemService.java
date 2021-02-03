package com.example.BM_Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private UserRepository userRepository;

    ItemService(){}

    @Transactional
    public Optional<ItemEntity> getItem(long id) {
        return itemRepository.findById(id);
    }

    @Transactional
    public List<ItemEntity> getAllItems() {
        return itemRepository.findAll();
    }

    @Transactional
    public long setItem(ItemEntity itemEntity){
        long buyerId = itemEntity.getBuyer().getId();
        Optional<UserEntity> optUserEntity = userRepository.findById(buyerId);
        UserEntity userEntity = optUserEntity.get();
        itemEntity.setBuyer(userEntity);
        itemRepository.save(itemEntity);
        return itemEntity.getId();
    }
}
