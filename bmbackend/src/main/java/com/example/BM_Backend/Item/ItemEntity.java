package com.example.BM_Backend.Item;

import com.example.BM_Backend.User.UserEntity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ITEM_ENTITY")
@Data
public class ItemEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ITEM_CLASS")
    private String itemClass;

    @Column(name = "PRICE")
    private float price;

    @Column(name = "CURRENCY")
    private String currency;

    @Column(name = "QUANTITY")
    private int quantity;

    //    @Temporal(TemporalType.DATE)
//    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "PURCHASE_DATE")
    private String date;

    //@OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    @JoinColumn(name = "FK_BUYER", referencedColumnName = "ID")
    private UserEntity buyer;
}
