package com.brunoicaro.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.brunoicaro.DTO.TituloRequestDTO;
import com.brunoicaro.DTO.TituloResponseDTO;
import com.brunoicaro.model.Titulo;
import com.brunoicaro.service.TituloService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/titulo")
public class TituloController {
    
    private final TituloService tituloService;

    public TituloController(TituloService tituloService){
        this.tituloService = tituloService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public @ResponseBody List<TituloResponseDTO> getAll(){
        return tituloService.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Titulo saveTitulo(@RequestBody @Valid TituloRequestDTO data){
        return tituloService.saveTitulo(data);
    }

    @GetMapping("/{id}")
    public TituloResponseDTO findById(@PathVariable @NotNull @Positive Long id){
        return tituloService.findById(id);
    }

    @PutMapping("/{id}")
    public Titulo update(@PathVariable @NotNull @Positive Long id, @RequestBody Titulo titulo){
        return tituloService.update(id ,titulo);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        tituloService.delete(id);
    }

}
