package com.example.BM_Backend.Item;

import com.example.BM_Backend.User.UserEntity;
import com.example.BM_Backend.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        UserEntity userEntity = null;
        if(itemEntity.getBuyer() != null){
            long buyerId = itemEntity.getBuyer().getId();
            Optional<UserEntity> optUserEntity = userRepository.findById(buyerId);
            userEntity = optUserEntity.get();
        }
        itemEntity.setBuyer(userEntity);
        itemRepository.save(itemEntity);
        return itemEntity.getId();
    }

    @Transactional
    public Map<String, Boolean> deleteItem(long id){
        ItemEntity itemEntity = itemRepository.findById(id)
                .orElseThrow(()-> new ResourceAccessException("Item not found "+ id));
        itemRepository.delete(itemEntity);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
