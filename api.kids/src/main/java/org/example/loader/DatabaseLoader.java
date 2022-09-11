package org.example.loader;

import org.example.constants.Roles;
import org.example.entities.RoleEntity;
import org.example.repositories.RoleRepository;
import org.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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
    }
}
