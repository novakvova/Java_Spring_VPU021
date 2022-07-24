package org.example.entities;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "tblParents")
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 100, nullable = false)
    private String firstName;

    @Column(length = 100, nullable = false)
    private String lastName;

    @Column(length = 20, nullable = false)
    private String phone;

    @Column(length = 50)
    private String image;

    @Column(length = 250)
    private String adress;
}
