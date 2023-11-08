package com.brunoicaro.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.brunoicaro.DTO.AtorRequestDTO;
import com.brunoicaro.DTO.AtorResponseDTO;
import com.brunoicaro.model.Ator;
import com.brunoicaro.service.AtorService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/ator")
public class AtorController {

    private final AtorService atorService;

    public AtorController(AtorService atorService){
        this.atorService = atorService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public @ResponseBody List<AtorResponseDTO> getAll(){
        return atorService.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Ator saveAtor(@RequestBody @Valid AtorRequestDTO data){
        return atorService.saveAtor(data);
    }

    @GetMapping("/{id}")
    public Ator findById(@PathVariable @NotNull @Positive Long id){
        return atorService.findById(id);
    }

    @PutMapping("/{id}")
    public Ator update(@PathVariable @NotNull @Positive Long id, @RequestBody Ator ator){
        return atorService.update(id ,ator);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        atorService.delete(id);
    }

}
