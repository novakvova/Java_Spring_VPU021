package org.example.mapper;

import org.example.dto.parentdto.ParentAddDto;
import org.example.dto.parentdto.ParentItemDto;
import org.example.entities.Parent;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ApplicationMapper {
    Parent ParentByParentAddDto(ParentAddDto dto);
    ParentItemDto parentToParentItemDto(Parent Parent);
    List<ParentItemDto> parentsToParentsAllDto(List<Parent> parents);
}
