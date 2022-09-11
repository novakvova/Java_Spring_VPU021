package org.example.loader;

import org.example.constants.Roles;
import org.example.entities.RoleEntity;
import org.example.entities.UserEntity;
import org.example.repositories.RoleRepository;
import org.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.Arrays;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(this.roleRepository.count() == 0) {
            this.roleRepository.save(new RoleEntity(Roles.Admin));
            this.roleRepository.save(new RoleEntity(Roles.User));
        }
        if(this.userRepository.count()==0)
        {
            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            UserEntity user = new UserEntity();
            user.setEmail("admin@gmail.com");
            user.setName("Сашко Юхимович");
            user.setPhone("096 620 73 778");
            user.setPassword(encoder.encode("123456"));
            user.setRoles(Arrays.asList(roleRepository.findByName(Roles.Admin)));
            this.userRepository.save(user);
        }
    }
}
