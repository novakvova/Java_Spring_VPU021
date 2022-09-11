package org.example.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "user_entities")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="name", length = 255)
    private String name;
    @Column(name="email", length = 255)
    private String email;
    @Column(name="phone", length = 20)
    private String phone;
    @Column(name="password", length = 255)
    private String password;

    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(
            name = "user_roles",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "role_id") }
    )
    private List<RoleEntity> roles = new ArrayList<>();
}
