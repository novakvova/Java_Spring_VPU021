package org.example.dto.account;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
@Data
public class RegisterView {
    @NotNull
    @Email
    private String email;
    @NotNull
    private String password;
    private String fullName;
}
