package com.example.BM_Backend.Item;

import com.example.BM_Backend.User.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;

@Data
public class ItemDto {
    private long id;
    private String itemClass;
    private float price;
    private String currency;
    private int quantity;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date purchaseDate;
    private UserDto buyer;
}
