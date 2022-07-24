package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.entities.Parent;
import org.example.repositories.ParentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final ParentRepository parentRepository;
    @GetMapping("/")
    public List<Parent> index() {
        return parentRepository.findAll();
    }
}
