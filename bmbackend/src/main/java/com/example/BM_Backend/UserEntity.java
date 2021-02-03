package com.example.BM_Backend;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="USER_ENTITY")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="NAME", length=50, nullable=false, unique=true)
    private String name;

    @Column(name="EMAIL", length=50, nullable=false, unique=false)
    private String email;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "buyer", cascade = CascadeType.PERSIST)
    private List<ItemEntity> itemList = new ArrayList<>();
}
