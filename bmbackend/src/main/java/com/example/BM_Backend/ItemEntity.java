package com.example.BM_Backend;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @ManyToOne
    @JoinColumn(name = "FK_BUYER")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity buyer;
}
