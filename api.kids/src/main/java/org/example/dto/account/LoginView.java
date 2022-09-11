package org.example.dto.account;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class LoginView {
    @NotNull
    @Email
    private String username;
    @NotNull
    private String password;
}
