package com.example.BM_Backend.Item;

import com.example.BM_Backend.User.UserDto;
import lombok.Data;

@Data
public class ItemDto {
    private long id;
    private String itemClass;
    private float price;
    private String currency;
    private int quantity;
    private String date;
    private UserDto buyer;
}
