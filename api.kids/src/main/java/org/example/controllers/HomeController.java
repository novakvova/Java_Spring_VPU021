package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dto.parentdto.ParentAddDto;
import org.example.entities.Parent;
import org.example.repositories.ParentRepository;
import org.example.storage.StorageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final StorageService storageService;
    private final ParentRepository parentRepository;
    @GetMapping("/")
    public List<Parent> index() {
        return parentRepository.findAll();
    }

    @PostMapping("/")
    public String upload(ParentAddDto parentAddDto) {
        String fileName = storageService.store(parentAddDto.getImageBase64());
        return fileName;
    }
}
