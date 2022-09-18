package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.configuration.security.JwtTokenUtil;
import org.example.constants.Roles;
import org.example.dto.account.LoginView;
import org.example.dto.account.RegisterView;
import org.example.dto.account.UserView;
import org.example.dto.parentdto.ParentAddDto;
import org.example.dto.parentdto.ParentItemDto;
import org.example.dto.parentdto.ParentUpdateDto;
import org.example.entities.Parent;
import org.example.entities.UserEntity;
import org.example.mapper.ApplicationMapper;
import org.example.repositories.ParentRepository;
import org.example.repositories.RoleRepository;
import org.example.repositories.UserRepository;
import org.example.storage.StorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/account")
public class AccountController {

    private final ApplicationMapper mapper;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @PostMapping("login")
    public ResponseEntity<UserView> login(@RequestBody @Valid LoginView request) {
        try {
            UserView userView = loginUser(request.getUsername(), request.getPassword());
            return ResponseEntity.ok()
                    .body(userView);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterView request) {
        try {
            UserEntity userdb =  userRepository.findByEmail(request.getEmail());
            if(userdb!=null)
            {
                return ResponseEntity.badRequest()
                        .body("Дана пошта уже зареєстрована");
            }
            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            userdb = new UserEntity();
            userdb.setEmail(request.getEmail());
            userdb.setName(request.getFullName());
            userdb.setPassword(encoder.encode(request.getPassword()));
            userdb.setRoles(Arrays.asList(
                    roleRepository.findByName(Roles.User)));
            this.userRepository.save(userdb);

            UserView userView = loginUser(request.getEmail(), request.getPassword());
            return ResponseEntity.ok()
                    .body(userView);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



    private UserView loginUser(String username, String password) throws BadCredentialsException {
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        username,
                        password));

        User user = (User) authenticate.getPrincipal();
        UserEntity dbUser = userRepository
                .findByEmail(user.getUsername());
        UserView userView = new UserView(); //userMapper.UserToUserView(dbUser);// new UserView();
        userView.setUsername(user.getUsername());
        userView.setId(dbUser.getId());
        userView.setFullName(dbUser.getName());
        userView.setToken(jwtTokenUtil.generateAccessToken(dbUser));
        return userView;
    }


}
