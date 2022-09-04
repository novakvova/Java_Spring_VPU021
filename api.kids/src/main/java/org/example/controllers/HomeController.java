package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dto.parentdto.ParentAddDto;
import org.example.dto.parentdto.ParentItemDto;
import org.example.dto.parentdto.ParentUpdateDto;
import org.example.entities.Parent;
import org.example.mapper.ApplicationMapper;
import org.example.repositories.ParentRepository;
import org.example.storage.StorageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.Resource;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final ApplicationMapper mapper;
    private final StorageService storageService;
    private final ParentRepository parentRepository;
    @GetMapping("/")
    public List<ParentItemDto> index() {
        List<ParentItemDto> items =  mapper.parentsToParentsAllDto(parentRepository.findAll());
        return items;
    }

    @PostMapping("/create")
    public String add(@RequestBody ParentAddDto parentAddDto) {
        Parent parent = mapper.ParentByParentAddDto(parentAddDto);
        String fileName = storageService.store(parentAddDto.getImageBase64());
        parent.setImage(fileName);
        parentRepository.save(parent);
        return fileName;
    }

    @DeleteMapping("/remove/{id}")
    public int deleteParent(@PathVariable int id) {
        Parent p = parentRepository.findById(id).get();
        parentRepository.deleteById(id);
        storageService.removeFile(p.getImage());
        return 0;
    }

    @PutMapping("/update")
    public int updateParent(@RequestBody ParentUpdateDto dto) {
        Parent parent = parentRepository.findById(dto.getId()).get();
        Parent update = mapper.ParentUpdateDtoByParent(dto);
        update.setImage(parent.getImage());
        String imgBase64 = dto.getImageBase64();
        if(imgBase64 != null && !imgBase64.isEmpty())
        {
            storageService.removeFile(parent.getImage());
            String fileName = storageService.store(dto.getImageBase64());
            update.setImage(fileName);
        }
        parentRepository.save(update);
        return 0;
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws Exception {

        Resource file = storageService.loadAsResource(filename);
        String urlFileName =  URLEncoder.encode("сало.jpg", StandardCharsets.UTF_8.toString());
        return ResponseEntity.ok()
                //.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
                .contentType(MediaType.IMAGE_JPEG)

                .header(HttpHeaders.CONTENT_DISPOSITION,"filename=\""+urlFileName+"\"")
                .body(file);
    }
}
