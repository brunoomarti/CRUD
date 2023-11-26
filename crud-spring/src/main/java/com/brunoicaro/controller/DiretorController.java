package com.brunoicaro.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.brunoicaro.DTO.DiretorRequestDTO;
import com.brunoicaro.DTO.DiretorResponseDTO;
import com.brunoicaro.model.Diretor;
import com.brunoicaro.service.DiretorService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/diretor")
public class DiretorController {

    private final DiretorService diretorService;

    public DiretorController(DiretorService diretorService){
        this.diretorService = diretorService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public @ResponseBody List<DiretorResponseDTO> getAll(){
        return diretorService.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Diretor saveDiretor(@RequestBody @Valid DiretorRequestDTO data){
        return diretorService.saveDiretor(data);
    }

    @GetMapping("/{id}")
    public Diretor findById(@PathVariable @NotNull @Positive Long id){
        return diretorService.findById(id);
    }

    @PutMapping("/{id}")
    public Diretor update(@PathVariable @NotNull @Positive Long id, @RequestBody Diretor diretor){
        return diretorService.update(id, diretor);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        diretorService.delete(id);
    }
    
}
