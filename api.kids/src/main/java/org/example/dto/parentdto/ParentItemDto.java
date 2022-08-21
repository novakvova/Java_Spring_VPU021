package org.example.dto.parentdto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class ParentItemDto {
    private int id;

    private String firstName;

    private String lastName;

    private String phone;

    private String image;

}
