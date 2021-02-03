package com.example.BM_Backend;

import lombok.Data;

@Data
public class ItemDto {
    private long id;
    private String itemClass;
    private float price;
    private String currency;
    private int quantity;
    private UserDto buyer;
}
