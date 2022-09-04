package org.example.dto.parentdto;

import lombok.Data;

@Data
public class ParentUpdateDto {
    private  int id;
    private String imageBase64;
    private String firstName;
    private String lastName;
    private String phone;
    private String adress;
}
